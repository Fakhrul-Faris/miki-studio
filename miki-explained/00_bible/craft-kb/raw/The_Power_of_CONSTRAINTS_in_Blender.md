[0:00] there's 27 of them they are incredibly

[0:02] useful and surprisingly simple to use

[0:04] yet most people Overlook and

[0:07] underestimate the power of these amazing

[0:09] blender features constraints

[0:12] now this is the copy location constraint

[0:15] it's one of the more basic ones and it

[0:17] does exactly what you expect it to do it

[0:19] copies the location of any object in

[0:22] your scene and moves the constrained

[0:24] object to that location but what exactly

[0:27] are constraints basically they are ways

[0:30] to control the properties of objects in

[0:32] your scenes usually related to other

[0:34] objects you could call them object

[0:37] relationships and they come in four

[0:39] categories motion tracking transform

[0:42] tracking and relationship in this video

[0:45] specifically we'll dive into the

[0:47] transform constraint so let's get back

[0:49] into that copy location constraint like

[0:52] I said in essence it just copies the

[0:54] location of any object in your scene but

[0:56] it can actually do a lot more in this

[0:59] example the cube has a simple lateral

[1:01] movement as well as going slightly up so

[1:04] let's take the monkey and add a copy

[1:05] location constraint which we can do over

[1:08] in the constraint tab which is over here

[1:10] I'll set the cube as the target and

[1:13] immediately the monkey is moved to the

[1:15] same location as the cube respecting its

[1:18] animation as well well so far no

[1:20] surprises here it just does exactly as

[1:22] you expect from it now for the other

[1:24] options the first being the vertex group

[1:26] I'm not going to go into detail on this

[1:29] but some transform constraints have this

[1:32] option it's mostly used for advanced

[1:35] rigging and constrained options in for

[1:37] example character animation and

[1:39] therefore I'm not going to touch it in

[1:40] this introductory video on constraints

[1:43] next we have axes another option most

[1:46] constraints have this will let you limit

[1:48] the effect of the constraint on a

[1:50] certain axis if we for example disable

[1:52] the X and Y we now only copy the Z

[1:56] location or the vertical movement of the

[1:58] cube so you will now see our monkey is

[2:00] just moving up and down only copying the

[2:03] Z movement of this Cube then we have

[2:05] invert which just inverts any movement

[2:08] on any enabled axis and if I for example

[2:11] only enable the XX since you will see it

[2:14] basically mirrors the Cube's movement so

[2:16] the inverter goal can help you create an

[2:19] easy mirror for some things third

[2:20] there's offset which when enabled will

[2:23] take the constraints object's original

[2:25] location and take that into

[2:27] consideration basically it will add on

[2:30] top of that the cubes movement but

[2:32] respecting the original relative

[2:34] position of R wonky then there's two

[2:37] transform space selections now again

[2:39] most of these constraints have this and

[2:42] if you ask me don't touch these and just

[2:44] leave them on world space which in most

[2:46] instances will be just fine finally

[2:48] there's influence well all constraints

[2:51] have this slider and this basically

[2:53] allows you to tweak how much your object

[2:55] is affected by its constraint or by its

[2:58] Target so it's a great way to add a more

[3:00] natural look especially when it comes to

[3:02] animating with constraints the copy

[3:05] location constraint is perfect for

[3:07] creating things like sliding doors where

[3:09] you can easily mirror the movement of

[3:10] one door to the other the next one on

[3:13] the list is copy rotation which is very

[3:15] similar to copy location the only

[3:17] difference being that instead of copying

[3:19] the location it copies an object's

[3:21] rotation so whatever Target you set this

[3:24] to it will take the rotation of this

[3:25] Target and apply it to your constrained

[3:28] object it has many of the same options

[3:30] the axes allows for limiting rotation on

[3:33] a per axis basis invert lets you mirror

[3:36] the rotation per axis and influence

[3:39] again lets you set how much your object

[3:41] is affected by its Target now there's

[3:43] two more options to look at here mix and

[3:45] Order Mix lets you set how you wish to

[3:48] use the original movement frankly I only

[3:51] use two of these replace which removes

[3:53] any existing rotation on the object and

[3:55] replaces it with the target's rotation

[3:57] and add which as it sounds adds the

[4:00] original rotation of your object to the

[4:03] rotation of the target so this can

[4:05] create some intricate rotational

[4:07] movement only using this constraint in a

[4:09] matter of seconds the copy rotation

[4:11] constraint is per perfect for creating a

[4:13] fixed rotational objects such as gear

[4:16] systems copy skill is another basic

[4:19] constraint which simply does as you

[4:21] expect it copies the skill of a Target

[4:23] object with again a per axis limit and

[4:26] the ability to control the influence

[4:28] what's very cool here though is the

[4:30] power slider this will let you multiply

[4:32] the skill change of the target to make

[4:35] your objects be affected more or less

[4:37] depending on what value you use here it

[4:40] can even convert an object scaling up

[4:43] into an object scaling down when you set

[4:46] it to a negative value now you can

[4:48] toggle make uniform to make sure that

[4:51] the scaling is done on all axes and you

[4:53] can toggle offset if you have a

[4:55] secondary skill animation you wish to

[4:57] use as well copy skill is mostly used in

[5:00] rigging as is a very convenient way of

[5:02] copying the skill of Bones across your

[5:04] rig copy transforms is one of my least

[5:07] favorite constraints as I don't find it

[5:10] to be very useful again it does as you

[5:13] expected just copies all the transforms

[5:15] of your target object and takes them to

[5:17] your constrained object location

[5:19] rotation and skill it's similar to

[5:22] Parenting an object with Ctrl P I guess

[5:24] now this constraint does have two unique

[5:26] options you can toggle remove Target

[5:28] share which in my experience usually

[5:31] doesn't do anything but feel free to

[5:33] leave a comment if you know what this

[5:34] does and if you find it useful at all

[5:36] and the other one is the mix type which

[5:38] will let you control how blender

[5:40] interprets the targets transforms

[5:41] however in most cases I just prefer

[5:44] using the constraints on a individual

[5:46] basis so location rotation and skill

[5:48] individually as this gives me way more

[5:51] flexibility than using the copy

[5:53] transforms constraint copy transforms is

[5:56] another one that's mostly used for

[5:57] rigging it's especially functional for

[6:00] doing things like facial rigging and

[6:02] motion capture besides blender's

[6:04] constraints you can also experience

[6:05] actual constraints holding you back in

[6:07] your learning process now to help you

[6:09] overcome these constraints I've

[6:10] partnered up with CG boost on more than

[6:13] once have helped me understand things

[6:15] and learn the ins and outs of blender

[6:16] with one of their amazing courses I

[6:19] especially like Martin klechner's

[6:20] landscape course as it contains so much

[6:22] high quality instructions hours of

[6:24] content and it really helped me get

[6:26] those landscape designs up to that

[6:29] Hollywood quality that you want and

[6:31] besides the courses you'll also get to

[6:33] be part of an inspiring learning

[6:35] community of over 18 000 active students

[6:38] and the CG boost team there to help you

[6:41] answer questions when you have them now

[6:43] as I firmly believe these courses will

[6:45] help you get better at blender I'm super

[6:47] excited to say that CG boost has offered

[6:50] to give the first 50 people who go to

[6:52] the link cgboost.com Kaizen and use code

[6:56] kaizen20 a 20 discount on their purchase

[7:00] so make sure to check out the link in

[7:02] the description down below and get one

[7:04] of their courses at a amazing discount

[7:06] right now alright so let's get back to

[7:08] our constraints here limit distance is

[7:11] another very intuitive of constraint as

[7:13] the name States it limits the distance

[7:15] between the Target and the object

[7:17] setting the distance value helps

[7:19] determine this distance and lets you

[7:21] have control over the constraint and

[7:23] again you can also use the influence

[7:25] slider to further control the effect a

[7:27] fun way to use the limit distance

[7:28] constraint is to create a solar system

[7:30] and this way you can make sure the

[7:32] planets never leave their orbit as they

[7:34] rotate around a fixed limited distance

[7:36] around the Sun so I'm assuming you are

[7:39] starting to see a pattern here right

[7:40] most of these are very intuitive and

[7:42] limit rotation is no different as it

[7:44] lets you set the limits or specifically

[7:46] the minimum and maximum rotation of an

[7:49] object on a per axis basis the order

[7:52] option lets you specify in which order

[7:54] the axes are interpreted by blender but

[7:57] I just always leave it on default limit

[7:59] rotation for example lets you create a

[8:02] door pay attention though there could be

[8:04] some snapping issues now that brings us

[8:06] to limit skill again it's as simple as

[8:10] it sounds the constraint will let you

[8:12] set at a minimum or maximum skill per

[8:14] axes as well as give you control over

[8:16] how strong the effect is with the

[8:18] influence slider limit scale is again

[8:20] perfect for rigging especially cartoony

[8:22] characters which have more stretching

[8:24] going on in their limbs the next one

[8:26] down is one of my favorite constraints

[8:28] and it's called maintain volume and it's

[8:31] perfect for animating things this

[8:33] constraint is unique in its purpose as

[8:35] it ensures the volume of an object is

[8:37] constant you can control the volume with

[8:39] a number here and set the axis which

[8:42] shouldn't change in the free axis

[8:44] selection you can set how strict it is

[8:46] in the mode but by default it's set to

[8:48] strict which works well enough so how

[8:50] does this work then the maintain volume

[8:52] constrained looks at the default applied

[8:55] skill size which if you don't change the

[8:57] cube is 2 times 2 times 2 and appoints

[9:00] an arbitrary number of 1M as the volume

[9:03] to this default size in actuality this

[9:06] is incorrect as the volume of the cube

[9:08] is actually 8 meters cubed but whatever

[9:10] so if you now Inc increase the volume

[9:13] slider to 2m you are effectively

[9:15] doubling the total volume of the cube

[9:17] which means the cube has the skill to

[9:20] account for this increase in volume it

[9:22] does this on all axes except the one you

[9:25] have selected in the free axes so when

[9:26] animating it's important for objects to

[9:29] maintain their volume to make things

[9:31] look as realistic as possible so look at

[9:33] this example for instance this is a ball

[9:35] and it bounces and as it does it

[9:37] squishes stretches and deforms as a

[9:40] result of the forces applied to it and

[9:42] this is all done because the shape or

[9:44] the volume cannot change now here's an

[9:47] example of this same principle but then

[9:49] applied to a jumping sphere in a more

[9:52] cartoonish Manner and I really feel that

[9:54] this technique makes objects come alive

[9:56] and please let me know if you agree on

[9:57] that in the comments now the last

[9:59] constraint is definitely not the least

[10:02] as it's my favorite one in the list of

[10:04] transform constraints and that's because

[10:06] it's infinitely versatile the

[10:08] it's infinitely versatile the transformation

[10:10] the transformation constraint lets you

[10:12] take your Target's transform value and

[10:15] apply or convert it to a certain

[10:17] property of your object it's basically a

[10:19] map range node for constraints you can

[10:22] map any range location rotation or skill

[10:25] to any other transform so let's

[10:28] transform this cylinder's location to

[10:30] the monkey's rotation and to do so we

[10:33] can Define the location Min and Max per

[10:35] axis so for example I can set the x Min

[10:39] to negative 1 and the x max to plus 1

[10:42] and then go into map 2 and select the

[10:44] rotation tab here in this case I want to

[10:46] rotate the monkey on the x-axis between

[10:49] 0 and 180 degrees so now if I start

[10:52] moving the cylinder from left to right

[10:54] on the x axis in this case the monkey

[10:57] rotates accordingly it's so cool and

[11:00] practical as we've effectively mapped a

[11:03] location range from negative 1 to 1 to a

[11:05] rotation range of 0 to 180. good to know

[11:08] that if you want the transformation to

[11:11] keep going and basically keep on

[11:13] rotating the monkey you can enable the

[11:15] extrapolate toggle now if you remove the

[11:18] cylinder the monkey will just keep on

[11:20] rotating and in the case that your

[11:22] object already has its own transforms

[11:25] going on you can set the mix mode to

[11:27] something else to get the desired

[11:28] results it's important to note that when

[11:30] you want to take the map from range into

[11:33] the map 2 range and you want to change

[11:35] for example the x-axis to the y-axis

[11:38] that you'll have to change the source

[11:39] axis in the map too so for example if

[11:41] you want to take the X Min and max range

[11:44] and you want to convert that to a y

[11:46] location range you have to change the Y

[11:50] Source axis down here into X so it will

[11:53] take the X map from input and take it

[11:56] into the map to y a cool way to use the

[11:59] transformation constraint is to create a

[12:01] drawbridge in this case we can convert

[12:03] the rotation of our handle here to the

[12:06] rotation of the actual Bridge part so

[12:08] now you know how to unlock the

[12:10] incredibly useful powers of constraints

[12:13] in blender but do you actually have

[12:15] stuff to apply them to so how about you

[12:17] check out this video and get working on

[12:19] those modeling skills next

[12:22] thanks a ton to the following patrons

[12:24] for supporting the channel

[12:28] [Music]

[12:40] thank you