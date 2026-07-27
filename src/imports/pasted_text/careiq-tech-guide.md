CareIQ Vertical Technical Capability Guides
Childcare, K-12 Education, Healthcare, and Religious Campuses

CareIQ for Childcare and Development Centers
Technical Capability Guide

Positioning and Overview
CareIQ gives childcare and development centers continuous behavioral monitoring built on cameras already installed on site, with no hardware replacement required. Built on VisualIQ's visual analytics foundation and developed with childcare expert guidance, CareIQ watches continuously so a director does not have to review every camera all day.
CareIQ escalates only the events that match center-specific, configured rules, such as supervision ratios, pickup-zone crowding, and restricted-room access. CareIQ is not meant to replace directors, lead teachers, or human judgment. It acts as an early awareness layer.
1. Core Technical Architecture
Existing center cameras or NVR streams feed the system using RTSP or local video files for testing. A low-frame-rate sampling layer keeps workload small. A lightweight AI detector identifies people, small groups, and basic object candidates. Object tracking and zone logic interpret behavior over time. A childcare-specific rule engine applies room schedules, ratio thresholds, and zone definitions.
Layer
Purpose
Camera/NVR ingest
Connects to RTSP streams, NVR-restreamed video, or local sample videos.
Frame sampling
Processes small frames at low FPS by default to keep latency and cost low.
Lightweight detection
Detects people, groups, bags, and basic object/scene candidates.
Tracking
Maintains presence and count over time for ratio and dwell logic.
Zone and schedule engine
Applies room-specific zones and daily program schedules.
Rule engine
Turns detections into center-specific events such as unattended-room or ratio alerts.
Event and alert layer
Stores events, evidence, status, and alert delivery data for director review.
Dashboard
Shows room status, recent alerts, event detail, thumbnails, and clips.

2. Camera and Video Capabilities
Supported or target video sources: RTSP camera streams, NVR-restreamed video, local video files, IP cameras, existing camera networks, and future ONVIF discovery.
Deployment
Camera Range
Pilot
1 to 5 cameras (single classroom or wing)
Single center
5 to 20 cameras
Multi-room / multi-building center
20 to 50 cameras

Adaptive Processing Modes
Mode
Typical FPS
Frame Size
Use Case
Idle / low-risk
0.2 to 1 FPS
Small frame
Health checks, basic change detection during naptime
Watch
1 FPS
416x416 or 640x360
Normal monitoring across classrooms
Active
5 FPS
640x360 or 640x640
Triggered by movement or ratio-relevant activity
Alert
5 to 10 FPS
Clip/crop-based
Short evidence capture for review

3. Real-Time Detection Capabilities
Initial detection classes: person, group/count estimate, bag/object obstruction, camera blocked/offline.
Later detection classes: person-down/fall candidate, door-propped-open, unattended-object-in-classroom candidate, crowd buildup at pickup zone.
4. Childcare-Specific Rule Engine
Generic AI says "person detected in room." CareIQ should say "Room 3 has zero adult presence with children still in frame."
Rule inputs: room location, time of day, program schedule, occupant count, adult presence, object duration, zone entry, dwell time, risk level of area, event severity.
Example rule logic
	•	If a room shows child occupancy with zero adult presence past a configured threshold, create a critical ratio alert.
	•	If pickup-zone headcount exceeds a safe threshold during dismissal, create a watch alert.
	•	If motion occurs in a medication or supply room outside staff hours, create a critical review alert.
5. Zone-Based Awareness
Polygon zones per classroom, pickup/drop-off lane, kitchen, medication room, and staff-only storage.
Example: a staff member in the hallway is normal, but the same staff member entering the medication room outside a scheduled time may require an alert.
6. Schedule-Aware Monitoring
Arrival window, classroom instruction blocks, naptime, outdoor play, pickup/dismissal, and after-hours.
Ratio and access rules apply differently in each window, for example, quiet-hours motion thresholds during naptime.
7. Use Case Categories
Supervision and Ratio Monitoring
	•	Zero-adult-presence detection in occupied rooms
	•	Ratio-threshold alerts
	•	Naptime motion anomalies
Pickup and Drop-off Safety
	•	Crowd buildup at dismissal
	•	Lingering in pickup zones
	•	Unusual movement near entry points
Restricted Area Protection
	•	Medication room access
	•	Kitchen access outside meal prep windows
	•	Storage room activity
Facility Operations
	•	Camera offline or blocked
	•	After-hours building access
	•	Maintenance area activity
8. Alerting and Dashboard Capabilities
Alert fields: alert type, severity, camera/location name, time, short summary, confidence score, thumbnail, short video clip, recommended action, status (new/acknowledged/resolved/false positive).
Alert channels: dashboard, email, SMS, Slack or Microsoft Teams webhook, mobile push (later).
Example alert
Critical, Toddler Room 3. No adult presence detected in an occupied classroom for over 90 seconds. Evidence: 20-second clip available. Recommended action: director should verify immediately.
9. Evidence Clip Capabilities
Typical clip policy: 10 seconds before event and 10 seconds after.
Evidence supports director review, incident documentation, false-positive review, and staff training over time.
10. Privacy and Responsible AI Boundaries
	•	No facial recognition in MVP.
	•	No identity matching in MVP.
	•	No individual child identification.
	•	Local-first processing where possible.
	•	Short event clips instead of constant cloud upload.
	•	Human review before escalation.
	•	False-positive feedback loop.
	•	Clear retention policy.
11. Deployment and Hardware Range
Deployment
Camera Range
Typical Hardware
Pilot
1 to 5 cameras
GPU laptop or workstation, low FPS sampling
Single center
5 to 20 cameras
Single GPU workstation, ratio and access rules
Multi-room / multi-building
20 to 50 cameras
Higher-end workstation or small server, adaptive FPS

Available as a combined package with DeepSenseIQ for centers that need full-facility camera coverage, starting at $40 to $75 per camera per month.
12. Frequently Asked Questions
Does CareIQ replace a center's existing check-in or live-streaming app?
No. CareIQ is a behavioral safety layer, built to complement those tools, not replace them.
Does CareIQ require new cameras?
No, it runs on cameras already installed on site.
Can CareIQ identify specific children or staff?
Not in its current form. It detects patterns and presence, not identity.
13. Manual-Ready Description
CareIQ helps childcare and development centers extend existing cameras into a continuous safety layer. Instead of asking staff to watch every room all day, CareIQ applies center-specific rules (supervision ratios, pickup-zone crowding, restricted-room access) and escalates only the events that matter, with a thumbnail and short clip so a director can verify and act quickly.

CareIQ for K-12 Schools
Technical Capability Guide

Positioning and Overview
CareIQ gives K-12 schools campus-wide behavioral safety monitoring built around child protection as the core use case, with DeepSenseIQ available for districts that need full-campus coverage beyond CareIQ's core models.
A school campus has far more cameras than any administrator or SRO can watch continuously. CareIQ applies school-tuned models to flag events worth a look, such as an unrecognized entry pattern during class hours or a hallway crowd forming outside a scheduled passing period. CareIQ is not meant to replace administrators, SROs, or human judgment.
1. Core Technical Architecture
Existing district cameras or NVR streams feed the system using RTSP or local video files for testing. A low-frame-rate sampling layer keeps workload manageable across a multi-building campus. Lightweight AI detects people, vehicles, and objects. Tracking interprets movement over time. A school-specific rule engine applies bell schedules, zone definitions, and event thresholds.
Layer
Purpose
Camera/NVR ingest
Connects to RTSP streams, NVR-restreamed video, or local sample videos.
Frame sampling
Low FPS by default across a large multi-camera campus.
Lightweight detection
People, vehicles, bags, basic object/scene candidates.
Tracking
Maintains identity for hallway crowd and parking lot dwell logic.
Zone and schedule engine
Applies campus zones and bell schedules.
Rule engine
Turns detections into school-specific events (unauthorized entry, after-hours access).
Event and alert layer
Stores events, evidence, status, and alert delivery data.
Dashboard
Camera status, recent alerts, event detail, clip playback.

2. Camera and Video Capabilities
Supported or target video sources: RTSP camera streams, NVR-restreamed video, local video files, IP cameras, existing camera networks, and future ONVIF discovery.
Deployment
Camera Range
Pilot (single building)
1 to 20 cameras
Single school
20 to 50 cameras
Multi-building campus
50 to 200 cameras, using adaptive processing
District-wide
200+ cameras across multiple sites

Adaptive Processing Modes
Mode
Typical FPS
Frame Size
Use Case
Idle / low-risk
0.2 to 1 FPS
Small frame
Overnight and weekend health checks
Watch
1 FPS
416x416 or 640x360
Normal school-day monitoring
Active
5 FPS
640x360 or 640x640
Triggered by movement near entries or lots
Alert
5 to 10 FPS
Clip/crop-based
Short evidence capture at flagged entries

3. Real-Time Detection Capabilities
Initial detection classes: person, vehicle, bag/object obstruction, crowd density candidate, camera blocked/offline.
Later detection classes: running or aggressive movement candidate, door propped open, queue or crowd buildup, restricted-object candidate.
4. School-Specific Rule Engine
Generic AI says "door opened." CareIQ should say "side door opened during third period with no scheduled passing period."
Rule inputs: camera location, bell schedule, object type, dwell time, zone entry, movement path, risk level of area, event severity.
Example rule logic
	•	If an exterior door not designated as a normal entry point opens during instructional hours, create a critical access alert.
	•	If hallway crowd density exceeds normal class-change patterns outside a scheduled bell time, create a review alert.
	•	If a vehicle remains in a student lot past a configured window after dismissal, create a watch alert.
5. Zone-Based Awareness
Zones for entrances/exits, hallways, cafeteria, gym, administrative offices, and parking lots.
Example: a student in the hallway during passing period is normal, but the same movement pattern outside the bell schedule may warrant an alert.
6. Schedule-Aware Monitoring
Passing periods, lunch waves, dismissal, after-school activities, weekends, and breaks.
Rules apply differently across each window so normal class-change crowding is not mistaken for a security event.
7. Use Case Categories
Perimeter and Entry Awareness
	•	Unauthorized door use
	•	Tailgating patterns
	•	After-hours access
Hallway and Common-Area Monitoring
	•	Crowd buildup
	•	Loitering outside class-change windows
Parking and Arrival/Dismissal Safety
	•	Vehicle lingering
	•	Crowd concentration at pickup lanes
Facility Operations
	•	Camera health across a large, multi-building campus
8. Alerting and Dashboard Capabilities
Alert fields: alert type, severity, camera/location name, time, short summary, confidence score, thumbnail, short video clip, recommended action, status (new/acknowledged/resolved/false positive).
Alert channels: dashboard, email, SMS, Slack or Microsoft Teams webhook, mobile push (later).
Example alert
Watch, East Entrance. Door opened outside scheduled passing period. Evidence: 20-second clip available. Recommended action: SRO or front-office staff should confirm authorized entry.
9. Evidence Clip Capabilities
Typical clip policy: 10 seconds before and after the event.
Supports SRO review, incident reports, and administrative documentation.
10. Privacy and Responsible AI Boundaries
	•	No facial recognition in MVP.
	•	No student identity matching.
	•	No weapon detection claimed as a reliable MVP feature.
	•	Local-first processing where possible.
	•	Human review before escalation.
11. Deployment and Hardware Range
Deployment
Camera Range
Typical Hardware
Pilot
1 to 20 cameras
GPU workstation, basic alerts
Single school
20 to 50 cameras
Higher-end workstation or small server
Multi-building campus
50 to 200 cameras
DGX-class or multi-GPU server, adaptive scheduling

Full-campus coverage available through the DeepSenseIQ bundle at $40 to $75 per camera per month.
12. Frequently Asked Questions
Is CareIQ a weapons-detection system?
No, it does not claim reliable weapon detection in its current form.
Does CareIQ require replacing existing school cameras?
No, it runs on the district's existing camera and NVR infrastructure.
Can DeepSenseIQ extend this to the whole campus?
Yes, districts that want broader coverage beyond CareIQ's child-protection-specific models can bundle DeepSenseIQ for full-campus triage.
13. Manual-Ready Description
CareIQ helps K-12 schools turn existing campus cameras into an active safety layer centered on child protection. It watches entrances, hallways, and parking areas against the school's real bell schedule, flags activity outside normal patterns, and delivers alerts with a summary, thumbnail, and short clip so front-office staff or an SRO can respond quickly. DeepSenseIQ is available for districts that need broader, full-campus coverage.

CareIQ for Healthcare Facilities
Technical Capability Guide

Positioning and Overview
CareIQ supports patient and staff safety monitoring in healthcare facilities, with particular focus on vulnerable-population settings such as NICU and pediatric units. This is behavioral and safety monitoring, not health-records data, so it does not require HIPAA documentation for the facility-security use case itself.
Vulnerable patients often cannot advocate for themselves, and unit staff cannot watch every room continuously. CareIQ applies behavior-detection models to flag events like a fall candidate or a restricted-area entry, so nursing staff get an early, reviewable alert instead of finding out after the fact. CareIQ is not meant to replace nursing staff, clinicians, or human judgment.
1. Core Technical Architecture
Existing unit cameras or NVR streams feed the system using RTSP or local video files for testing. A low-frame-rate sampling layer keeps workload small. Lightweight AI detects people and basic movement candidates. Tracking and behavior analysis interpret patient and staff movement over time. A care-specific rule engine applies unit schedules, zone definitions, and event thresholds tuned for fall risk and restricted access.
Layer
Purpose
Camera/NVR ingest
Connects to RTSP streams, NVR-restreamed video, or local sample videos.
Frame sampling
Processes small frames at low FPS by default to keep latency and cost low.
Lightweight detection
Detects people and basic movement/scene candidates.
Tracking
Maintains presence and movement patterns for fall-risk and dwell logic.
Zone and schedule engine
Applies unit-specific zones and shift/visiting-hour schedules.
Rule engine
Turns detections into care-specific events such as fall candidate or restricted-unit access.
Event and alert layer
Stores events, evidence, status, and alert delivery data for nursing staff review.
Dashboard
Shows unit status, recent alerts, event detail, thumbnails, and clips.

2. Camera and Video Capabilities
Supported or target video sources: RTSP camera streams, NVR-restreamed video, local video files, IP cameras, existing camera networks, and future ONVIF discovery.
Deployment
Camera Range
Pilot
1 to 5 cameras (single unit)
Single unit (NICU or pediatric)
5 to 20 cameras
Multi-unit facility
20 to 50 cameras
Multi-building health system
50 to 200 cameras, using adaptive processing

Adaptive Processing Modes
Mode
Typical FPS
Frame Size
Use Case
Idle / low-risk
0.2 to 1 FPS
Small frame
Overnight low-traffic monitoring
Watch
1 FPS
416x416 or 640x360
Normal unit monitoring
Active
5 FPS
640x360 or 640x640
Triggered by movement near beds or exits
Alert
5 to 10 FPS
Clip/crop-based
Short evidence capture for staff verification

3. Real-Time Detection Capabilities
Initial detection classes: person, basic movement candidate, camera blocked/offline.
Later detection classes: person-down/fall candidate, bed-exit candidate, unit-door-propped-open, unusual dwell near restricted rooms.
4. Care-Specific Rule Engine
Generic AI says "movement detected." CareIQ should say "possible fall candidate in Pediatric Hallway 2, no staff present nearby."
Rule inputs: unit location, time of day, shift schedule, visiting hours, movement pattern, dwell time, risk level of area, event severity.
Example rule logic
	•	If a fall-candidate movement pattern is detected in a patient room or hallway, create a critical alert with an evidence clip for immediate staff review.
	•	If access to a NICU or pediatric unit occurs outside authorized staff or visitor windows, create a restricted-access alert.
	•	If a patient at elevated mobility risk is detected leaving a bed zone without staff presence nearby, create a watch alert.
5. Zone-Based Awareness
Zones map to unit types: NICU, pediatric, general ward, and restricted medication rooms, rather than a generic building layout.
Example: staff movement in a general hallway is normal, but the same staff member entering a medication room outside a scheduled window may require an alert.
6. Schedule-Aware Monitoring
Shift changes, visiting hours, and unit-specific access windows.
Rules apply differently across shift and visiting-hour windows so routine staff and family movement is not mistaken for a security event.
7. Use Case Categories
Vulnerable-Population Monitoring
	•	NICU behavioral safety
	•	Pediatric-unit behavioral safety
Fall and Movement-Risk Detection
	•	Person-down candidates
	•	Elevated mobility-risk movement candidates
Restricted-Area Protection
	•	Medication room access
	•	Unit access control
	•	After-hours entry
Facility Operations
	•	Camera health across clinical units
8. Alerting and Dashboard Capabilities
Alert fields: alert type, severity, camera/location name, time, short summary, confidence score, thumbnail, short video clip, recommended action, status (new/acknowledged/resolved/false positive).
Alert channels: dashboard, email, SMS, Slack or Microsoft Teams webhook, mobile push (later).
Example alert
Critical, Pediatric Unit Hallway 2. Fall candidate detected. Evidence: 20-second clip available. Recommended action: nursing staff should verify immediately.
9. Evidence Clip Capabilities
Typical clip policy: 10 seconds before event and 10 seconds after.
Evidence supports nursing staff verification, incident documentation, false-positive review, and training over time.
10. Privacy and Responsible AI Boundaries
	•	No facial recognition in MVP.
	•	No biometric patient identification.
	•	No medical diagnosis performed or claimed.
	•	Local-first processing where possible.
	•	Short event clips instead of constant cloud upload.
	•	Human clinical review before escalation.
	•	Clear retention policy.
11. Deployment and Hardware Range
Deployment
Camera Range
Typical Hardware
Pilot
1 to 5 cameras
GPU laptop or workstation, low FPS sampling
Single unit
5 to 20 cameras
Single GPU workstation, fall and access rules
Multi-unit facility
20 to 50 cameras
Higher-end workstation or small server, adaptive FPS
Multi-building health system
50 to 200 cameras
DGX-class or multi-GPU server, adaptive scheduling

DeepSenseIQ is available for facilities that need broader adult and general-population monitoring and data triage beyond CareIQ's vulnerable-population-specific models, starting at $40 to $75 per camera per month. CyberIQ is available for healthcare IT teams, with LogIQ and NetworkIQ leading for compliance and ransomware-defense use cases.
12. Frequently Asked Questions
Does CareIQ access or store patient health records?
No. CareIQ is a behavioral and facility-safety monitoring layer built on camera data, and does not touch clinical or health-records systems.
Does this require new HIPAA documentation?
The facility-security use case is behavioral monitoring, not health-records handling, so it does not carry the same HIPAA documentation burden as clinical data systems. Facilities should still confirm specifics with their compliance team for their own environment.
Can CareIQ diagnose a medical event?
No. It flags candidate events, such as a possible fall, for a clinician or staff member to verify and act on.
What about general adult units, not just NICU or pediatric?
DeepSenseIQ is available to extend monitoring and data triage beyond CareIQ's vulnerable-population-specific models.
13. Manual-Ready Description
CareIQ helps healthcare facilities monitor vulnerable-patient units, such as NICU and pediatric wards, for safety-relevant activity such as fall candidates and restricted-area access, using cameras already installed on site. Alerts include a severity level, unit location, thumbnail, and short clip so nursing staff can verify and respond quickly, with DeepSenseIQ available for broader, facility-wide coverage.

CareIQ for Churches and Religious Campuses
Technical Capability Guide

Positioning and Overview
CareIQ helps churches turn existing cameras into a real-time care and safety system centered on children's ministry, built with childcare expert guidance. DeepSenseIQ is available alongside it for congregations that need full-campus security coverage beyond the children's wing.
CareIQ watches for church-specific concerns such as after-hours movement, restricted-area entry, and lingering near children's areas, and alerts staff with clear, reviewable evidence. CareIQ is not meant to replace staff, volunteers, security teams, or human judgment. It acts as an early awareness layer.
1. Core Technical Architecture
Existing church cameras or NVR streams feed the system using RTSP or local video files for testing. A low-frame-rate sampling layer keeps the workload small and fast. A lightweight AI detector identifies people, vehicles, bags, and basic object candidates. Object tracking and zone logic interpret behavior over time. A church-specific rule engine applies schedules, camera locations, zone definitions, and event thresholds.
Layer
Purpose
Camera/NVR ingest
Connects to RTSP streams, NVR-restreamed video, or local sample videos.
Frame sampling
Processes small frames at low FPS by default to keep latency and compute cost low.
Lightweight detection
Detects people, vehicles, bags, and basic object/scene candidates.
Tracking
Maintains object identity over time for lingering, zone crossing, and repeated activity.
Zone and schedule engine
Applies camera-specific zones and church calendars to interpret activity correctly.
Rule engine
Turns detections into church-specific events such as after-hours person or restricted-zone entry.
Event and alert layer
Stores events, evidence, status, and alert delivery data for staff review.
Dashboard
Shows camera health, recent alerts, event details, thumbnails, and clips.

2. Camera and Video Capabilities
Supported or target video sources: RTSP camera streams, NVR-restreamed video, local video files, IP security cameras, existing camera networks, and future ONVIF discovery.
Deployment
Camera Range
Pilot
1 to 5 cameras
Small church
5 to 20 cameras
Medium church or school campus
20 to 50 cameras
Large church / multi-building campus
50 to 200 cameras, using adaptive processing

Adaptive Processing Modes
Mode
Typical FPS
Frame Size
Use Case
Idle / low-risk
0.2 to 1 FPS
Small frame
Health checks and basic change detection
Watch
1 FPS
416x416 or 640x360
Normal monitoring across many cameras
Active
5 FPS
640x360 or 640x640
Triggered by movement or object presence
Alert
5 to 10 FPS
Clip/crop-based
Short evidence capture and optional verification

3. Real-Time Detection Capabilities
Initial detection classes: person, vehicle, backpack/bag/suitcase, general object obstruction, crowd density candidate, camera blocked/offline.
Later detection classes: person-down/fall candidate, smoke or fire visual candidate, door propped open, running or aggressive movement candidate, queue or crowd buildup, restricted object or facility hazard candidates.
4. Church-Specific Rule Engine
Generic AI says "person detected." CareIQ should say "a person entered the children's wing after check-in closed."
Rule inputs: camera location, time of day, church schedule, object type, object duration, movement path, zone entry, lingering time, risk level of area, event severity.
Example rule logic
	•	If a person is detected in the children's hallway outside approved children's ministry hours, create a warning alert.
	•	If a vehicle remains in the parking lot for more than 10 minutes after hours, create a watch or warning alert.
	•	If movement occurs near the offering room outside authorized times, create a critical review alert.
5. Zone-Based Awareness
Nursery hallway and classroom doorways, restricted office doors, offering/counting room entrances, AV booth, sanctuary stage, backstage areas, parking lot entrances, side doors, emergency exits, and storage hallways.
Example: a person in the lobby may be normal, but the same person crossing into the nursery hallway after check-in closes may require an alert.
6. Schedule-Aware Monitoring
Sunday service (7:00 AM to 1:00 PM), youth group (Wednesday 5:00 PM to 9:00 PM), school or academy day (Monday to Friday 7:30 AM to 4:00 PM), after-hours (10:00 PM to 6:00 AM), and configurable special-event schedules.
Rules apply differently across each window so normal congregational movement is not mistaken for a security event.
7. Use Case Categories
Children's Ministry Safety (CareIQ core)
	•	Person entering children's wing after check-in closes
	•	Adult lingering near nursery or classroom doorway
	•	Movement in children's hallway after program ends
	•	Camera covering children's area offline
After-Hours Building Awareness
	•	Person detected inside after hours
	•	Movement near sanctuary, offices, nursery, or offering room
	•	Vehicle lingering in parking lot after hours
Full-Campus Security (DeepSenseIQ bundle)
	•	Sanctuary, office, and multi-building perimeter coverage
	•	Parking lot awareness during and after events
	•	Congregation-wide data triage beyond children's-ministry-specific models
Facility Operations
	•	Camera offline or blocked
	•	Movement in storage or maintenance areas
	•	Activity in building after closing
8. Alerting and Dashboard Capabilities
Alert fields: alert type, severity, camera/location name, time, short summary, confidence score, thumbnail, short video clip, recommended action, status (new/acknowledged/resolved/false positive).
Alert channels: dashboard, email, SMS, Slack or Microsoft Teams webhook, mobile push (later).
Example alert
Warning, Nursery Hallway. A person has remained near the nursery hallway for more than 2 minutes after check-in closed. Evidence: 20-second clip available. Recommended action: review and notify children's ministry lead if needed.
9. Evidence Clip Capabilities
Typical clip policy: 10 seconds before event and 10 seconds after event.
Evidence clips support staff review, safety-team handoff, incident reports, false-positive review, and training over time.
10. Privacy and Responsible AI Boundaries
	•	No facial recognition in MVP.
	•	No license plate recognition in MVP.
	•	No identity matching in MVP.
	•	No child identification.
	•	Local-first processing where possible.
	•	Short event clips instead of constant cloud upload.
	•	Human review before escalation.
	•	Clear retention policy.
11. Deployment and Hardware Range
Deployment
Camera Range
Typical Hardware
Pilot
1 to 5 cameras
GPU laptop or workstation, low FPS sampling, basic alerts
Small church
5 to 20 cameras
Single GPU workstation, person/vehicle/bag detection, rules
Medium church / school campus
20 to 50 cameras
Higher-end GPU workstation or small server, adaptive FPS, tracking
Large church / multi-building campus
50 to 200 cameras
DGX-class or multi-GPU server, adaptive scheduling

Children's ministry monitoring is the CareIQ core. Full-campus physical security coverage is available through the DeepSenseIQ bundle at $40 to $75 per camera per month, all-inclusive, with no hardware replacement required.
12. Frequently Asked Questions
Is CareIQ only for the children's ministry area?
CareIQ's core models are built around children's ministry safety. For coverage across the rest of the campus, such as the sanctuary, offices, and parking, congregations pair it with the DeepSenseIQ bundle.
Does this replace security staff or volunteers?
No. It's an early-awareness layer that surfaces reviewable alerts. Human staff and volunteers still make every call.
What does it cost for a typical congregation?
The CareIQ plus DeepSenseIQ bundle for full-campus coverage runs $40 to $75 per camera per month, all-inclusive, with no hardware replacement required.
13. Manual-Ready Description
CareIQ helps churches protect their children's ministry with continuous behavioral monitoring, flagging activity like a person in the children's wing after check-in closes or movement near the offering room after hours. For congregations that want coverage beyond the children's areas, the DeepSenseIQ bundle extends the same camera infrastructure into full-campus security, all without replacing existing hardware.

CareIQ for Hospitality
Technical Capability Guide: Vulnerable-Guest Monitoring for Resorts and Hospitality Properties

Positioning and Overview
CareIQ supports hospitality properties and family resorts with vulnerable-guest monitoring, delivered alongside DeepSenseIQ, which triages the rest of the property's operational and security data across multiple routes, camera feeds, incident logs, and vendor paperwork, into a single correlated stream on the same camera infrastructure and bundle.
Family resorts and hospitality properties carry specific safety concerns around pools and water features, children's club areas, and guests who may need help but are not being actively watched at that moment. CareIQ is not meant to replace lifeguards, resort staff, or human judgment. It acts as an early awareness layer for the moments no one happened to be looking.
1. Core Technical Architecture
Existing property cameras or NVR streams feed the system using RTSP or local video files for testing. A low-frame-rate sampling layer keeps workload small. A lightweight AI detector identifies people and basic movement candidates. Object tracking and zone logic interpret behavior over time. A hospitality-specific rule engine applies pool, kids'-club, and grounds zones with property schedules.
Layer
Purpose
Camera/NVR ingest
Connects to RTSP streams, NVR-restreamed video, or local sample videos from existing property cameras.
Frame sampling
Processes small frames at low FPS by default to keep latency and cost low.
Lightweight detection
Detects people and basic movement/scene candidates.
Tracking
Maintains presence and motion patterns over time for distress and unattended-child logic.
Zone and schedule engine
Applies pool, kids'-club, and grounds zones alongside property operating schedules.
Rule engine
Turns detections into guest-safety events such as a possible water-distress candidate or unattended child near a pool.
Event and alert layer
Stores events, evidence, status, and alert delivery data for staff review.
Dashboard
Shows zone status, recent alerts, event detail, thumbnails, and clips.

2. Camera and Video Capabilities
Supported or target video sources: RTSP camera streams, NVR-restreamed video, local video files, and existing property camera networks.
Deployment
Camera Range
Single property
10 to 30 cameras (pool, kids' club, and key grounds areas)
Resort campus
30 to 100 cameras across a larger property
Multi-property group
100+ cameras across several resort locations

3. Real-Time Detection Capabilities
Initial detection classes: person, basic movement candidate, camera blocked or offline.
Later detection classes: possible water-distress candidate (motionless in water), unattended child near a pool or water feature, wandering or disoriented movement pattern candidate.
4. Hospitality-Specific Rule Engine
Generic AI says "person in water." CareIQ should say "a person has been motionless in the main pool for over 20 seconds, a pattern consistent with possible distress."
Rule inputs: zone location, time of day, property schedule, motion pattern, dwell time, risk level of area, event severity.
Example rule logic
	•	If a person in a pool or water feature shows no motion for a configured duration, generate a critical alert for immediate staff or lifeguard response.
	•	If a child is detected near a pool or water feature without adult presence beyond a configured threshold, generate a critical alert.
	•	If a guest shows a wandering or disoriented movement pattern repeated across restricted or unsupervised areas, generate a watch alert for staff wellbeing check.
5. Zone-Based Awareness
Pool and water-feature zones, kids'-club areas, guest-room hallways, and resort grounds.
Example: a family playing near the pool's edge is normal, but a person motionless in the water for an extended period may require an alert.
6. Schedule-Aware Monitoring
Pool hours, kids'-club program hours, and after-hours periods for grounds and hallways.
Rules apply differently across these windows so normal daytime pool activity is not mistaken for a safety event.
7. Use Case Categories
Pool and Water Safety Monitoring
	•	Possible distress detection in pools and water features
	•	Unattended child detection near water
Children's Area Safety
	•	Kids'-club zone monitoring during and outside program hours
	•	Unattended-child alerts near restricted areas
Vulnerable Guest Wellbeing Checks
	•	Wandering or disoriented movement pattern flags for staff follow-up
Facility Operations
	•	Camera offline or blocked in pool or grounds areas
8. Alerting and Dashboard Capabilities
Alert fields: alert type, severity, zone/camera location, time, summary, confidence score, thumbnail, short video clip, recommended action, status (new/acknowledged/resolved/false positive).
Alert channels: dashboard, email, SMS, Slack or Microsoft Teams webhook, mobile push (later).
Example alert
Critical, Main Pool Zone. A person has been motionless in the water for over 20 seconds, a pattern consistent with possible distress. Evidence: 20-second clip available. Recommended action: lifeguard or staff should respond immediately.
9. Evidence Clip Capabilities
Typical clip policy: 10 seconds before event and 10 seconds after.
Evidence supports staff review, incident documentation, false-positive review, and training over time.
10. Privacy and Responsible AI Boundaries
	•	No facial recognition in MVP.
	•	No identity matching in MVP.
	•	No medical diagnosis performed or claimed.
	•	Local-first processing where possible.
	•	Human review before escalation.
11. Deployment and Pricing
Deployment
Camera Range
Typical Hardware
Single property
10 to 30 cameras
GPU workstation, pool and kids'-club rules
Resort campus
30 to 100 cameras
Higher-end workstation or small server, adaptive FPS
Multi-property group
100+ cameras
Multi-GPU server, adaptive scheduling

Delivered as part of the same bundle as DeepSenseIQ's broader multi-route triage coverage for the property, which screens and correlates camera feeds, incident logs, and vendor paperwork across every route, at $40 to $75 per camera per month. No hardware replacement required.
12. Frequently Asked Questions
Does this replace lifeguards?
No. CareIQ is an early awareness layer. Lifeguards and resort staff still verify and respond to every alert.
Does this identify guests by name or face?
No, not in its current form. It detects movement and distress patterns, not identity.
How does this relate to DeepSenseIQ for our property?
CareIQ covers vulnerable-guest monitoring specifically: pools, kids' club, and wandering-guest patterns. DeepSenseIQ triages the rest of the property's data across multiple routes, camera feeds, incident logs, and vendor paperwork, into a single correlated stream. Both run on the same camera infrastructure and bundle.
13. Manual-Ready Description
CareIQ helps hospitality properties and family resorts protect vulnerable guests using cameras already installed on site. It flags possible water distress, unattended children near pools, and disoriented wandering patterns, delivering alerts with a summary, thumbnail, and short clip so staff can verify and respond immediately, as part of the same bundle as DeepSenseIQ's broader multi-route triage coverage, which correlates camera feeds, incident logs, and vendor paperwork into one operational picture for the rest of the property.
