BORDER_WIDTH = .1;
INTERLOCK_TOLERANCE = .125;
HOLDER_BORDER_WIDTH = .41; //.8
SLIDE_Z_OFFSET = 1.20;
//SLIDE_Z_OFFSET = 0;
BORDER_HEIGHT = 1.20;
HOLDER_SKIRT_WIDTH = .8;
HOLDER_SKIRT_HEIGHT = .2;
HOLDER_COLOR = [.5,.5,.5,1];
SLIDE_COLOR = [.75,.75,1,.5];
CORNER_DISTANCE = 10; //mm

module slide_holder_skirt(width, height)
{
	translate([-HOLDER_BORDER_WIDTH-INTERLOCK_TOLERANCE-HOLDER_SKIRT_WIDTH, -HOLDER_BORDER_WIDTH - INTERLOCK_TOLERANCE - HOLDER_SKIRT_WIDTH, -SLIDE_Z_OFFSET])
	{
		difference()
		{
			cube([width+INTERLOCK_TOLERANCE*2 + HOLDER_BORDER_WIDTH*2 + HOLDER_SKIRT_WIDTH*2, height+INTERLOCK_TOLERANCE*2 + HOLDER_BORDER_WIDTH*2 + HOLDER_SKIRT_WIDTH*2, HOLDER_SKIRT_HEIGHT]);
			translate([HOLDER_BORDER_WIDTH + HOLDER_SKIRT_WIDTH, HOLDER_BORDER_WIDTH + HOLDER_SKIRT_WIDTH, -.5])
			{
				cube([width+INTERLOCK_TOLERANCE*2, height+INTERLOCK_TOLERANCE*2, BORDER_HEIGHT+1]);
			}
		}
	}
}

module single_slide_holder(width, height)
{
	translate([-HOLDER_BORDER_WIDTH-INTERLOCK_TOLERANCE,-HOLDER_BORDER_WIDTH -INTERLOCK_TOLERANCE,-SLIDE_Z_OFFSET])
	{
		difference()
		{
			cube([width+INTERLOCK_TOLERANCE*2 + HOLDER_BORDER_WIDTH*2, height+INTERLOCK_TOLERANCE*2 + HOLDER_BORDER_WIDTH*2, BORDER_HEIGHT]);
			translate([HOLDER_BORDER_WIDTH, HOLDER_BORDER_WIDTH, -.5])
			{
				cube([width+INTERLOCK_TOLERANCE*2, height+INTERLOCK_TOLERANCE*2, BORDER_HEIGHT+1]);
			}
            translate([CORNER_DISTANCE + HOLDER_BORDER_WIDTH, -HOLDER_BORDER_WIDTH, -.5]){
                cube([width + INTERLOCK_TOLERANCE*2 - CORNER_DISTANCE*2, height+ INTERLOCK_TOLERANCE*2 + HOLDER_BORDER_WIDTH*4 , BORDER_HEIGHT+1]);
            }
            translate([-HOLDER_BORDER_WIDTH, HOLDER_BORDER_WIDTH + CORNER_DISTANCE, -.5]){
                cube([width + INTERLOCK_TOLERANCE*2 + HOLDER_BORDER_WIDTH*4, height+ INTERLOCK_TOLERANCE*2 - CORNER_DISTANCE*2 , BORDER_HEIGHT+1]);
            }
		}
	}
}

module PDMS_mockup(width,height){

	
	difference(){
		translate([0,0,.01]){
			cube([width,height,2.48]);
		}
			allComponents();
	}
	
}

module slide_mockup(width,height){
	translate([0,0,-SLIDE_Z_OFFSET]){
		cube([width, height, SLIDE_Z_OFFSET]);
	}
}

module preset_mold(width, height){
    color(HOLDER_COLOR)
    {
    single_slide_holder(width, height);
	slide_holder_skirt(width,height);
    }
	color(SLIDE_COLOR) %slide_mockup(width,height);
}


preset_mold(50,40);


