[0:02] Hello. Well, although there are many

[0:05] videos on this topic on YouTube, but I

[0:07] still wanted to create one, because

[0:10] most of the videos that are there mainly

[0:13] focus on the mathematical part

[0:15] But here I'm gonna show

[0:18] what actually happens when you use these

[0:20] things during your game development or

[0:23] development or 3D animations.

[0:26] So what actually we are going to talk

[0:27] about today is the way that we

[0:30] observe our 3D world, that is

[0:33] the cameras. So while

[0:36] dealing with or the 3D programming,

[0:38] developing or

[0:40] animations, we often

[0:43] use cameras to view our world and

[0:46] There are main two types of cameras,

[0:49] so we'll see how they work, what

[0:51] parameters they

[0:52] have, and what is the significance of all

[0:55] of their parameters.

[0:57] So, mostly this will be related

[1:00] to Three.js, and of course this will

[1:03] be... very much similar with other

[1:06] 3D development tools like Unity, or even

[1:09] Unreal, Godot anything. But this will be

[1:11] more relevant to Three.js developers

[1:14] because they are the ones who struggle

[1:16] with this...

[1:17] I'm considering that the game developers

[1:19] must be knowing all the crux of using

[1:21] cameras but the Three.js developers, they

[1:23] mainly focus on the creation of the scene

[1:26] but ignore these very basic points

[1:28] that need to be kept in mind.

[1:32] So while I'm hovering on this camera

[1:35] option, you can see there are two types

[1:36] of cameras that we have here, that we can

[1:39] use. So first let's start with the

[1:42] perspective camera because that's what we

[1:43] are more familiar with and because our

[1:46] eyes itself are the perspective cameras

[1:49] and all the cameras that we use in our

[1:50] daily lives like our phone camera or in

[1:52] either DSLR camera those are perspective

[1:55] cameras. So let's have a look at them.

[1:59] Let me just adjust quickly the values

[2:02] so I can show you properly. So I'll just

[2:04] reduce the far value here to 50. That

[2:06] will be good I guess. And I

[2:09] will reduce this maybe to 30

[2:12] the FOV value and we'll have a look

[2:14] at them one by one, what they really are.

[2:20] Now... with the perspective camera you get

[2:23] this typical pyramidical

[2:26] shape.

[2:29] And the tip or the peak of this pyramid

[2:31] is actually where the camera lies. So

[2:34] this point where we have these transform controls,

[2:35] that's actually where our

[2:38] camera is placed.

[2:43] And so if you are

[2:45] observing this screen,

[2:50] it means that, this is where your

[2:53] eyes are, kinda.

[2:56] And the screen is this

[2:59] rectangle, which is also called as the

[3:02] near plane. Now, if

[3:04] if you notice here, that this pyramid

[3:07] is divided into two parts.

[3:10] one is this with the yellowish outline

[3:12] and the smaller part is with the red

[3:14] outline. Now, this smaller part is also

[3:17] a pyramid but this yellowish part is

[3:20] frustum. That's what the shape is

[3:23] and this near plane actually has

[3:26] particular significance we'll see that in

[3:28] a while. So

[3:31] what this yellow part shows us

[3:34] or what does it mean here

[3:38] it is also called view frustum. So what

[3:41] it actually means is

[3:43] whatever the object in your scene

[3:47] if it lies in this frustum only

[3:49] then it is visible to the camera and if

[3:52] it doesn't it means it won't be visible

[3:55] to the camera. I can show you or

[3:57] demonstrate to you with the example.

[3:59] Suppose I add a mesh here, it will be a

[4:01] box mesh. Currently it is at

[4:04] origin of the scene, 0-0-0 on all the

[4:08] axes. And with the

[4:10] standard values. Now if I try to observe

[4:13] it with this added perspective camera,

[4:16] you can see the box properly placed and

[4:19] no issues with that. But

[4:22] if I intentionally drag it to the side

[4:25] to make it

[4:28] or pass through one of the

[4:31] side planes of this frustum in this

[4:34] way, let me drag it a little inside.

[4:38] And now if I try to observe it with the

[4:40] perspective camera, you can see a part of

[4:42] this box is now outside.

[4:46] of the frame that we can observe. We

[4:48] cannot see the entire box in this case.

[4:51] And this will also happen in case we take

[4:54] it a little upside to make it cut both

[4:56] the upper and right side

[5:00] plane. We can see it here whether it

[5:03] actually does that or not. Maybe

[5:07] kind of it does it. So if we again try to

[5:09] observe with the perspective camera, you

[5:10] can see here at this point, or maybe I'll

[5:13] take a little downside and move it

[5:17] to the left side.

[5:19] Now you can see this

[5:22] bottom left corner of the box is visible

[5:25] and not the entire box because it's now

[5:28] outside the view frustum. I mean the

[5:29] part of it is outside the view frustum

[5:31] and if we take it entirely outside of the

[5:33] view Preston and it won't be visible at

[5:35] all. So you just see the gray background

[5:37] in this case. Now,

[5:41] this is okay.

[5:46] People don't struggle with this thing

[5:49] usually, but the more

[5:52] problematic thing that people usually

[5:54] ignore is, with the near plane that

[5:57] is, most of the developers, I have

[6:00] seen create their

[6:03] projects but usually their

[6:06] models clip, while the

[6:09] camera is moving or even if the object is

[6:11] moving

[6:12] So what actually happens in this case is

[6:18] You see the near plane here. Now this

[6:21] is also the boundary of the view frustum.

[6:23] So when the object comes closer to the

[6:26] camera, that is even closer than the near

[6:28] plane, I mean it crosses the near plane

[6:30] to come closer to the camera,

[6:32] this point, even then the object is

[6:35] invisible or it can also be clipped.

[6:37] Mostly people ignore this

[6:38] and also don't understand this because

[6:40] they think that the object is properly in

[6:43] front of the camera. But still why it

[6:45] isn't visible

[6:46] when we move closer to it and when we

[6:48] move away from it, it's visible.

[6:51] The main thing is of course, the position

[6:53] of the near plane. So if you see here,

[6:57] if I select the camera. You

[7:00] can see here there are some parameters

[7:02] that we can adjust. Now near plane is

[7:04] actually the distance from the camera

[7:07] that we have to set. Currently it is 0.1

[7:10] but we can increase or decrease it

[7:12] however we want.

[7:15] And, if you see this that we cannot have aaa

[7:21] near value for our perspective camera as

[7:24] 0. Because if we do that, the entire

[7:26] camera disappears. We don't have a camera

[7:28] at all in that case.

[7:30] So you have to adjust this near value

[7:33] properly by considering how

[7:36] close is our camera going to be

[7:39] to any object in the scene. If it is

[7:41] going to be very much closer

[7:44] to the object, we need to set very small

[7:47] near value. But again, we have

[7:50] to handle some trade-offs because

[7:53] you cannot have very small near value

[7:55] that may cause some flickering of the

[7:57] scenes, flickering of the 3D models in

[7:59] your scene. So you have to adjust that

[8:02] properly. And

[8:05] again, the far

[8:08] plane also has same significance that if

[8:11] any object goes beyond this far plane, it

[8:13] won't be visible. But

[8:15] as far as perspective camera is

[8:16] concerned, the typical small

[8:19] objects, when they are taken far away

[8:22] from the camera, they already

[8:25] start shrinking and then disappear at

[8:29] certain point. So if I try to

[8:32] reduce it, you can see it's

[8:35] shrinking, shrinking and at some point it

[8:37] will already disappear even though it

[8:39] does not crosses the far plane, but the

[8:42] larger objects like mountains or

[8:45] something like that in the scene, those

[8:47] need to be culled with the

[8:50] view frustum.

[8:51] Now, I used the word cull that

[8:54] means clipping out

[8:57] or cutting out all the

[9:00] mesh or the 3D objects, parts of the 3D

[9:03] objects, if not the whole object.

[9:06] When it is outside the view frustum,

[9:08] that's the way of optimization

[9:10] There is a very good video from SimonDev

[9:13] on this topic and I will put the link in

[9:15] the description, about frustum culling and

[9:18] how games handle this thing.

[9:21] Now, as you know, I'm observing with this

[9:24] added perspective camera. And I want to

[9:27] show you how the near plane actually

[9:29] works and what is its significance.

[9:33] Now, here is the position or all these

[9:35] parameters are for this player model.

[9:39] And if I try to increase

[9:42] or maybe decrease the Z

[9:45] coordinates value - Z position of this

[9:47] object. Oh, I should be increasing!

[9:50] So, you can see it's it's coming or maybe

[9:53] I'll take it a little to the downside

[9:57] and if I'm I'm just taking it closer to

[9:59] the camera, like this

[10:03] and you'll see once it starts crossing

[10:06] the near plane it starts clipping and

[10:08] you'll be able to see the inside parts of

[10:10] this 3D model

[10:18] Like so.

[10:22] So this is what's happening here.

[10:25] You're being able to see the inside.

[10:30] And this is the good case because it

[10:33] happens when the

[10:36] model is very close to the camera, but

[10:39] at some, in some cases, you can

[10:42] have a large... Here you can see the near

[10:44] value is 0.04 which is a good small

[10:47] value but in case you have a larger value

[10:50] like 0.2

[10:53] let's let's keep it to 0.2 and

[10:56] now if you try to uh take it

[10:59] a little closer to the camera you'll see

[11:01] it starts clipping very early than it

[11:04] seems to be touching the camera

[11:09] like this

[11:12] so this, if we try to observe it with our

[11:15] default camera you'll see that this

[11:17] part is actually...

[11:21] is passing through the near plane and

[11:23] it's it has passed the near plane and

[11:26] closer to the camera than the near plane.

[11:27] Near plane must be lying somewhere over

[11:29] here. So this is what happens.

[11:35] One more thing about the Perspective

[11:37] camera is the field of vision, which we

[11:39] don't see in case of

[11:42] Orthographic camera. The field of vision

[11:44] is actually the angle between this

[11:47] this upper plane and the lower plane. So,

[11:50] this angle is actually the field of

[11:52] view, field of vision. So if I increase

[11:55] it, the angle increases and if I

[11:57] decrease it, the angle decreases. It also

[12:00] maintains the aspect ratio of this view

[12:03] frustum or the near and far plane. So

[12:06] even...

[12:10] If we try to observe from this angle,

[12:12] you'll see basically both the angles are

[12:15] changing because it adjusts uh

[12:19] aspect ratio, and

[12:22] let's see how the FOV value

[12:26] affects our

[12:30] observation or the way we

[12:33] see the world.

[12:37] I'm now viewing from the added

[12:39] perspective camera and now if I select

[12:42] that and change the FOV value

[12:45] now it's at this point it's 39 if I

[12:47] reduce it you'll see the objects

[12:51] this object oh yeah if I

[12:53] reduce it you'll see the object is... seem

[12:56] to be zoomed, zoomed in, the object

[12:59] is getting larger and larger.

[13:01] And if I increase,

[13:04] the object looks smaller.

[13:06] Now let's see what actually happens

[13:09] from our default camera's view.

[13:14] When I decrease this FOV value,

[13:18] the view frustum is

[13:21] shrinking and it focuses more and more on

[13:23] the 3D model that's at the center of

[13:26] the

[13:27] near and far planes, or which is just in

[13:30] front of the camera.

[13:33] And when we increase the FOV value.

[13:37] it enlarges and can see other

[13:40] things. I can show you with some other

[13:42] example like if I drag it here,

[13:45] if it is at the right place.

[13:56] I hope it is. So if I,

[14:00] now in this case you can see we have a

[14:01] cube and this uh

[14:04] player and we can

[14:07] see the cube because we have a

[14:10] good FOV value but

[14:13] if I try to reduce it

[14:16] and go on reducing at some point you'll

[14:17] see the cube disappears and even the legs

[14:19] of the

[14:20] player model and the player model seems

[14:23] to be zoomed in and this is what is

[14:25] happening the view frustum is

[14:28] shrunk down and now the cube

[14:31] lies outside of this view frustum

[14:34] also the legs and only we are able to see

[14:36] the upperpart of the player

[14:40] this is what basically happens or this is

[14:42] what the role of Field of vision is. Field

[14:44] of vision is basically how much of the

[14:46] world you'll be able to see with your

[14:48] camera. So if you know

[14:50] cows or buffaloes have a wider field of

[14:53] vision than us humans, that's what

[14:55] the field of vision is.

[14:57] Now let's have a look. Now let's see what

[15:00] Orthographic cameras are. They are

[15:03] really very different from the

[15:04] Perspective cameras. Let me just delete

[15:07] this Perspective camera and add

[15:11] an Orthographic camera.

[15:14] Let me just change the far value

[15:19] and adjust its position, like so.

[15:24] Now, for orthographic camera you see there

[15:26] is no pyramidical shape or

[15:30] not even a frustum. Frustum is basically

[15:32] the generic shape and here

[15:35] the cube or the cuboid you see is actually

[15:38] the specific type of frustum.

[15:41] So, in this case we get the cuboid

[15:43] And, again for the cuboid we have this

[15:45] near plane, this far plane

[15:48] And this all these values left, right,

[15:51] top, bottom are the distance

[15:53] from the line.

[15:57] I mean the line that just passes through

[16:00] the camera from the center. So

[16:03] if I just try to increase the top value,

[16:05] this goes up the upper plane. If I

[16:08] try to increase bottom value,

[16:11] the bottom plane tries to come up, if I

[16:14] reduce it, it goes down. It's just a

[16:17] distance from the camera.

[16:21] And we can also change the left and right

[16:24] values in the code. Not here, I don't

[16:26] know why. Now, let's set

[16:29] them to the default values.

[16:35] Okay. And again,

[16:38] if any object is inside this view frustum,

[16:39] which is cuboid in this case. Only

[16:42] then it will be visible and if it's not,

[16:45] it won't be visible. If it's

[16:48] closer than this near plane

[16:51] it won't be visible. If it's farther from

[16:54] that far plane over there it won't be

[16:57] visible. And

[17:00] you see there is no field of view

[17:03] parameter here because... we don't have

[17:06] any kind of angle here. It's just a

[17:07] simple cuboid which doesn't need to

[17:10] be adjusted. I mean, its angle

[17:13] doesn't have to be adjusted by us. It's

[17:15] just gonna be a cuboid. That's what

[17:16] Orthographic camera is. Now, the main

[17:18] difference between Orthographic camera

[17:20] and Perspective camera is, with the

[17:22] Perspective camera, the objects that are

[17:25] at a greater distance than some other

[17:27] object, it will seem smaller

[17:31] than that which is closer.

[17:34] Or I can show you with the example. I

[17:37] showed you before when I was taking the

[17:39] cube farther and farther away from the

[17:41] Perspective camera, it was shrinking

[17:44] down, it was getting smaller and smaller,

[17:46] but when we do that,

[17:49] oh sorry, let me take it in the view

[17:52] frustum, this cube. I hope it is. Let's

[17:55] see.

[17:58] Yeah, now it is. Now

[18:01] you see this cube here.

[18:04] I'll select that. Cube or the box. If

[18:07] I take this box,

[18:11] maybe towards the camera

[18:14] or maybe away from the camera.

[18:18] anywhere, nothing... I mean the

[18:21] size does not change. So with the

[18:24] Orthographic camera, irrespective of the

[18:26] distance from the camera, the size won't

[18:28] change. That's what the Orthographic

[18:30] camera is. And we

[18:33] can observe it with some other example

[18:35] also. If I take our player model a

[18:38] little to the center,

[18:42] And now observe with the orthographic

[18:43] camera. I select the orthographic camera

[18:46] here. I try to change the

[18:49] position of the orthographic camera here,

[18:51] the Z position. If I increase it, let's

[18:53] see. If I increase it,

[18:59] it goes away from the objects. If I

[19:01] decrease it, it goes closer to the

[19:03] objects. Now.

[19:08] You'll see here, if I increase it, it goes

[19:11] away from the object but

[19:12] still the object is of same size. If you

[19:14] reduce it, it goes closer to the object.

[19:16] Now, you observe here even though we don't

[19:18] see any change in the object but at this

[19:21] particular point here you see the near

[19:23] plane has passed the object and then

[19:27] you see the clipping with it, this player

[19:29] model and we can see

[19:33] from our other camera that

[19:38] the near plane here

[19:42] is cutting this player

[19:45] model. Now one more thing

[19:48] with orthographic camera is with the

[19:50] orthographic camera you see a... if I

[19:53] just take it a little backside here, you

[19:56] see there is some

[20:01] distance between the near plane and the

[20:04] camera's position, which is this near

[20:06] distance. But with the orthographic

[20:08] camera, you can have it exact zero.

[20:12] Even that works, but not with the

[20:13] perspective camera as I showed you before.

[20:15] You must be wondering how the zoom is handled with

[20:18] the orthographic camera, because with

[20:19] perspective camera it's handled by

[20:22] taking the camera closer or further from

[20:23] the object. That is, if you zoom in, the

[20:25] perspective camera goes closer to the

[20:26] object. When you zoom out, the

[20:28] perspective camera goes farther from the

[20:30] object. But with the orthographic

[20:32] camera's case, we saw that it

[20:35] doesn't happen. Even the camera is very

[20:37] close, we see the objects are

[20:40] of same size. Even if we take it, so far away

[20:43] from the object, I mean the camera,

[20:47] still the objects are of same size. So

[20:48] how is the zoom handled? So with the

[20:52] orthographic camera's case, how it's done

[20:53] is when you zoom in,

[20:56] Keeping all the relative sizes same

[20:59] for the objects, we enlarge

[21:03] the entire scene and we zoom out, the

[21:05] entire scene is again

[21:07] is shrunk down.

[21:11] That means. All the dimensions in

[21:14] the scene for all the objects will be

[21:16] increased by the same factor for zooming

[21:19] in and for zooming out it will be reduced

[21:21] by the same factor. So that's how zooming

[21:24] is handled in the orthographic camera.

[21:28] So yeah, this is what I wanted to point

[21:30] out and I hope this was

[21:33] helpful. So yeah! Thank You!