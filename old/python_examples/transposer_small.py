import microfluidic_SCAD_generator 

ufgen = microfluidic_SCAD_generator.UF_Generator("VT_SMALL")

c = ufgen.create_layer(ufgen.layer_offset, "Control", True, color="Red")
f = ufgen.create_layer(0, "Flow", color="Blue")

x_offset_start = 30
y_offset_start = 20

width = ufgen.width
height = ufgen.height
BUFFER_DISTANCE = 1 # mm, area left clear between features
transposer_width = ufgen.via_radius_1 * 2 *2  + ufgen.valve_radius_1 * 3 * 2 + BUFFER_DISTANCE * 8 + ufgen.channel_width *2
transposer_height = ufgen.via_radius_1 *1  *2+ ufgen.valve_radius_1 * 2  * 2+ BUFFER_DISTANCE * 3 + ufgen.channel_width *2
startX = x_offset_start
startY = y_offset_start
midX = x_offset_start + transposer_width/2
midY = y_offset_start + transposer_height/2
endX = x_offset_start + transposer_width
endY = y_offset_start + transposer_height

start1 = [startX, startY]
end1 = [endX, startY]
start2 = [startX,endY]
end2 = [endX, endY]

mid1 = [midX, startY]
mid2 = [midX, endY]

mid_offset_x = BUFFER_DISTANCE*2 + ufgen.valve_radius_1*3
mid_offset_y = BUFFER_DISTANCE  + ufgen.valve_radius_1 + ufgen.channel_width/2
mid_channel_offset_x = mid_offset_x + BUFFER_DISTANCE + ufgen.valve_radius_1 + ufgen.channel_width/2

mid1_forward = [midX - mid_offset_x, startY]
via_mid_forward = [midX - mid_offset_x, midY]
via_mid_backward = [midX + mid_offset_x, midY]
mid2_backward = [midX + mid_offset_x, endY]

valve1 = [midX - mid_offset_x/2, startY]
valve2 = [midX + mid_offset_x/2, endY]
valve3 = [midX, startY + mid_offset_y]
valve4 = [midX, endY - mid_offset_y]
valve5 = [midX - mid_offset_x, startY + mid_offset_y]
valve6 = [midX + mid_offset_x, endY - mid_offset_y]

valve7 = [midX + mid_channel_offset_x, startY + mid_offset_y]
valve8 = [midX + mid_channel_offset_x, endY - mid_offset_y]

valve9 = [midX -mid_channel_offset_x,startY]
valve10 = [midX -mid_channel_offset_x, endY]

valve11 = [endX - BUFFER_DISTANCE - ufgen.port_radius - ufgen.via_radius_1, startY]
valve12 = [endX, startY + mid_offset_y]

c1 = ufgen.create_channel(start1, end1, "Flow")
c2 = ufgen.create_channel(start2, end2, "Flow")

c3 = ufgen.create_channel(mid1, mid2, "Flow")
c4 = ufgen.create_channel(mid1_forward, via_mid_forward, "Flow")
c5 = ufgen.create_channel(mid2_backward, via_mid_backward, "Flow")

v1 = ufgen.create_via(via_mid_forward, "Flow")
v2 = ufgen.create_via(via_mid_backward, "Flow")

c6 = ufgen.create_channel(via_mid_forward, via_mid_backward, "Control")
p1 = ufgen.create_port(via_mid_forward, "Control")
p2 = ufgen.create_port(via_mid_backward, "Control")

va1 = ufgen.create_valve(valve1, "Control")
va2 = ufgen.create_valve(valve2, "Control")
va3 = ufgen.create_valve(valve3, "Control")
va4 = ufgen.create_valve(valve4, "Control")
va5 = ufgen.create_valve(valve5, "Control")
va6 = ufgen.create_valve(valve6, "Control")

c_line_1 = ufgen.create_channel(valve4, valve6, "Control")
c_line_2 = ufgen.create_channel(valve3, valve5, "Control")

c_line_3 = ufgen.create_channel(valve3, valve7, "Control")
c_line_4 = ufgen.create_channel(valve4, valve8, "Control")
c_line_5 = ufgen.create_channel(valve7, valve8, "Control")

c_line_6 = ufgen.create_channel(valve1, valve9, "Control")
c_line_7 = ufgen.create_channel(valve10, valve2, "Control")

c_line_8 = ufgen.create_channel(valve9, valve10, "Control")

c_line_9 = ufgen.create_channel(valve9, valve11, "Control")

c_line_10 = ufgen.create_channel(valve7, valve12, "Control")

w_via_1 = ufgen.create_via(start1, "Flow")
w_create_port_1 = ufgen.create_port(start1, "Control")

w_via_2 = ufgen.create_via(start2, "Flow")
w_create_port_2 = ufgen.create_port(start2, "Control")

w_via_end_1 = ufgen.create_via(end1, "Flow")
w_port_end_1 = ufgen.create_port(end1, "Control")

w_via_end_2 = ufgen.create_via(end2, "Flow")
w_port_end_2 = ufgen.create_port(end2, "Control")

pneu_port_1 = ufgen.create_port(valve11, "Control")
pneu_port_2 = ufgen.create_port(valve12, "Control")

corner_offset = 3;
offset_point_1 = [corner_offset, corner_offset]
offset_point_2 = [width-corner_offset, corner_offset]
offset_point_3 = [width-corner_offset, height-corner_offset]
offset_point_4 = [corner_offset, height-corner_offset]

standoff_1 = ufgen.create_standoff(offset_point_1, "Flow")
standoff_2 = ufgen.create_standoff(offset_point_2, "Flow")
standoff_3 = ufgen.create_standoff(offset_point_3, "Flow")
standoff_4 = ufgen.create_standoff(offset_point_4, "Flow")

ufgen.output_all_SCAD(False)