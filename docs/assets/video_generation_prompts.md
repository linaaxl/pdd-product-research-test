# AI Video Generation Prompts

Use these prompts in an AI video generator. Export the result as MP4 and place it in `public/videos/`.

General style constraints:

- Realistic classroom-safe footage, Chinese high school context.
- No visible brand logos, no readable license plates, no identifiable faces.
- 16:9 horizontal video, 8-15 seconds, stable camera.
- Leave clean space near the lower third for subtitles.
- Show the real-life phenomenon first, then a brief close-up of the relevant device area.

## 1. Generator Bike Light

Output file:

```text
public/videos/generator-bike-light.mp4
public/videos/generator-bike-light.jpg
```

Prompt:

```text
Realistic night scene near a school path, a student rides a bicycle slowly and the small front bike light is dim, then the bicycle speeds up and the light becomes clearly brighter. Camera follows from the side, then cuts to a close-up of the front wheel area and the bike light glowing brighter. Educational documentary style, safe campus environment, no visible brand logos, no identifiable faces, no license plates, cinematic but natural lighting, 16:9, 10 seconds.
```

Physics transition cue:

```text
End with a close-up of the wheel and light so the lesson can transition to changing magnetic flux and induced emf.
```

## 2. Wireless Charging Phone

Output file:

```text
public/videos/wireless-charging-phone.mp4
public/videos/wireless-charging-phone.jpg
```

Prompt:

```text
Realistic close-up on a study desk: a smartphone shows low battery, a student places it on a wireless charging pad, the charging icon appears and the battery indicator starts increasing. The camera slowly pushes in, then cuts to a clean close-up of the phone on the charging pad with subtle glowing rings suggesting energy transfer. No brand logos, no identifiable faces, modern classroom or bedroom study setting, 16:9, 10 seconds.
```

Physics transition cue:

```text
End with the phone and charging pad centered so the lesson can ask why a changing magnetic field is needed.
```

## 3. Shake Flashlight Camping

Output file:

```text
public/videos/shake-flashlight-camping.mp4
public/videos/shake-flashlight-camping.jpg
```

Prompt:

```text
Realistic camping or power-outage scene at night. A student tries a flashlight that is dim, shakes the flashlight several times, and the beam becomes brighter, lighting a tent or desk area. Camera starts wide to show the dark scene, then cuts to hands shaking the flashlight, then the light beam brightens. No identifiable faces, no brand logos, safe educational tone, 16:9, 10 seconds.
```

Physics transition cue:

```text
End with a close-up of the flashlight body so the lesson can reveal a magnet moving inside a coil.
```

## 4. E-Bike Speed Sensor School Gate

Output file:

```text
public/videos/ebike-speed-sensor-school-gate.mp4
public/videos/ebike-speed-sensor-school-gate.jpg
```

Prompt:

```text
Realistic daytime school gate or campus road scene. An electric bike moves slowly past a simple speed display, the display changes from 0 to a moderate speed. Camera cuts to a close-up of the wheel area with a small magnet marker passing near a sensor, then back to the display. No license plates, no identifiable faces, no brand logos, safe low-speed scene, educational documentary style, 16:9, 10 seconds.
```

Physics transition cue:

```text
End with the wheel and sensor region visible so the lesson can transition to electric pulses from changing magnetic flux.
```

## QA Checklist For Generated Videos

- The video clearly shows a real-life phenomenon before any physics explanation.
- The main object is readable on a classroom projector.
- The clip has no distracting logos, text, faces, or license plates.
- The final second visually supports transition into the interactive simulation.
- File names exactly match the required names in `public/videos/README.md`.
