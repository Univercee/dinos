# \<Class\>GameObject

## Description
All objects on the screen extends this class. To get access to action interfaces use methods: <br/>
<i>getStatic()</i> <br/>
<i>getWalkable()</i> <br/>
<i>getRunnable()</i> <br/>
<i>getJumpable()</i> <br/>

## Constructor
<i>sprite</i>: Sprite </br>
<i>move_speed</i>: number = 0 </br>
<i>run_speed</i>: number = 0 </br>
<i>jump_duration</i>: number = 0 </br>
<i>jump_speed</i>: number = 0
</br></br></br>

# \<Class\>Background (extends GameObject)

## Description
Main game component. Realise singleton pattern. </br>
All screen objects must be childs of the Backgroud

## Constructor
<i>sprite</i>: Sprite </br>
<i>move_speed</i>: number = 0 </br>
<i>run_speed</i>: number = 0 </br>
<i>jump_duration</i>: number = 0 </br>
<i>jump_speed</i>: number = 0
</br></br></br>

# \<Enum\>Actions

## Description
All actions <i>GameObject</i> can do </br>
Action list: </br>
<i>_0_Idle</i> </br>
<i>_1_Walk</i> </br>
<i>_2_Run</i> </br>
<i>_3_Jump</i>
</br></br></br>

# \<Class\>Sprite

## Description
Image with frame storyboard. Sprite image example: </br>
![SpriteExample](https://github.com/Univercee/react_app/blob/master/src/sprites/BlueDino.png)

## Constructor
<i>src</i>: string //image data string like 'data:image/jpeg;base64, LzlqLzRBQ... '; import src from './image.png' </br>
<i>breakpoints</i>: Map<Actions, [start_index: number, end_index: number]> //image actions slises </br>
<i>length</i>: number //number of the all frames on the image
</br></br></br>

# \<Class\>Static

## Description
Realise <i>_0_Idle</i> action

## Constructor
<i>sprite</i>: Sprite <br/>
<i>position</i>: [number, number] = [0, 0]
</br></br></br>

# \<Class\>Walkable

## Description
Realise <i>_1_Walk</i> action

## Constructor
<i>speed</i>: number
</br></br></br>

# \<Class\>Runnable

## Description
Realise <i>_2_Run</i> action

## Constructor
<i>speed</i>: number
</br></br></br>

# \<Class\>Jumpable

## Description
Realise <i>_3_Jump</i> action

## Constructor
<i>duration</i>: number </br>
<i>speed</i>: number
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
