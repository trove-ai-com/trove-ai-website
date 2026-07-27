VisualIQ Vertical Technical Capability Guides
Manufacturing, Government and Defense, Critical Infrastructure and Utilities, and Security Integrators / VMS Providers

VisualIQ for Manufacturing
Technical Capability Guide

Positioning and Overview
VisualIQ supports manufacturing facilities with combined security and operational intelligence, using video already present on the plant floor. It is hardware-agnostic: it installs on existing cameras and video management systems, with no hardware replacement required. DeepSenseIQ is available for facilities that need broader triage across plant-floor feeds and field data.
A plant floor combines three needs at once: safety compliance near machinery, perimeter and dock security, and operational visibility into congestion and downtime. VisualIQ is not meant to replace safety officers, floor supervisors, or human judgment. It acts as a continuous awareness layer that escalates only the events that match configured, plant-specific rules.
1. Core Technical Architecture
VisualIQ is built as a modular pipeline: video ingestion, frame sampling, object detection, object tracking, scene understanding, behavior analysis, a rule engine, and event output to alerting, search, dashboard, and API. Rather than analyzing frame by frame, the pipeline builds a temporal understanding of activity across the plant floor over time.
Layer
Purpose
Camera / NVR / drone ingest
Connects to RTSP streams, ONVIF cameras, NVR-restreamed video, and drone feeds already covering the plant floor.
Frame sampling
Processes small frames at low FPS by default to keep workload manageable across many lines and zones.
Object detection
Detects people, vehicles and forklifts, general objects, and camera health.
Object tracking
Computes trajectories, dwell time, and zone crossing instead of isolated detections.
Scene and behavior analysis
Builds spatial and temporal understanding of activity across production zones.
Rule engine
Applies plant-specific zones, shift schedules, and thresholds to determine whether an event is meaningful.
Event and alert layer
Generates alerts, evidence clips, metadata, and searchable events for floor and safety teams.
Dashboard / API
Shows zone status, recent events, and supports integration into existing plant systems.

2. Camera and Video Capabilities
Supported or target video sources: RTSP camera streams, ONVIF cameras, NVR-restreamed video, drone feeds, and local video files for testing.
Deployment
Camera Range
Pilot
1 to 10 cameras (single line or zone)
Single production line
10 to 30 cameras
Plant-wide
30 to 100 cameras across multiple lines
Multi-plant
100+ cameras across facilities, using adaptive processing

3. Real-Time Detection Capabilities
Initial detection classes: person, vehicle/forklift, bag/general object, camera blocked or offline.
Later detection classes: PPE-compliance candidate (hard hat, vest), restricted-machinery-zone entry, person-forklift proximity candidate, spill or obstruction candidate.
4. Manufacturing-Specific Rule Engine
Generic AI says "person detected near vehicle." VisualIQ should say "a person entered Line 4's forklift operating zone without a corresponding safety hold."
Rule inputs: zone location, shift schedule, object type, dwell time, proximity between person and vehicle or machinery, risk level of area, event severity.
Example rule logic
	•	If a person enters a zone marked for active machinery operation without a corresponding safety hold, create a critical alert.
	•	If person-to-forklift proximity falls below a safe threshold, create a warning alert.
	•	If congestion at a loading dock exceeds normal shift-change patterns, create an operational review alert rather than a security alert.
5. Zone-Based Awareness
Polygon zones per production line, restricted machinery area, loading dock, and forklift lane.
Example: a person walking through a general aisle is normal, but the same person crossing into an active machinery zone without a safety hold may require an alert.
6. Schedule-Aware Monitoring
Day, swing, and night shift schedules, plus planned maintenance windows.
Rules apply differently across shifts so normal shift-change congestion is not mistaken for a security or safety event.
7. Use Case Categories
Safety and Compliance Monitoring
	•	PPE-compliance candidate detection
	•	Restricted machinery zone entry
	•	Person-forklift proximity alerts
Operational Intelligence
	•	Line congestion and dwell-time analytics
	•	Workflow bottleneck flags
	•	Shift-change traffic patterns
Perimeter and Facility Security
	•	After-hours access detection
	•	Camera health across a large plant footprint
Loading Dock and Asset Monitoring
	•	Vehicle dwell time at docks
	•	Unauthorized dock access
8. Alerting and Dashboard Capabilities
Alert fields: alert type, severity, zone/camera location, time, summary, confidence score, thumbnail, short clip, recommended action, status (new/acknowledged/resolved/false positive).
Alert channels: dashboard, email, SMS, Slack or Microsoft Teams webhook, integration with existing plant systems via API.
Example alert
Warning, Line 4 Restricted Zone. Person detected within an active forklift operating zone without a recorded safety hold. Evidence: 20-second clip available. Recommended action: floor supervisor should verify immediately.
9. Evidence Clip Capabilities
Typical clip policy: 10 seconds before event and 10 seconds after.
Evidence supports safety-team review, incident documentation, false-positive review, and operational trend analysis over time.
10. Privacy and Responsible AI Boundaries
	•	No facial recognition in MVP.
	•	No identity matching tied to individual personnel records.
	•	Local-first processing where possible.
	•	Short event clips instead of constant cloud upload.
	•	Human review before escalation.
	•	Clear retention policy.
11. Deployment and Hardware Range
Deployment
Camera Range
Typical Hardware
Pilot
1 to 10 cameras
GPU workstation, low FPS sampling
Single line
10 to 30 cameras
Single GPU workstation, zone and proximity rules
Plant-wide
30 to 100 cameras
Higher-end workstation or small server, adaptive FPS
Multi-plant
100+ cameras
DGX-class or multi-GPU server, adaptive scheduling

No hardware replacement required. DeepSenseIQ is available for facilities that need broader data triage across plant-floor feeds and field data from remote or disconnected sites. Standalone VisualIQ pricing to be finalized.
12. Frequently Asked Questions
Does this replace our safety officers?
No. VisualIQ is an early awareness layer. Safety officers and floor supervisors still verify and act on every alert.
Does this require new cameras on the plant floor?
No, it runs on existing cameras, NVR systems, and drone feeds already in use.
Can VisualIQ identify specific workers by name?
Not in its current form. It detects patterns, proximity, and zone activity, not individual identity.
13. Manual-Ready Description
VisualIQ helps manufacturing facilities combine safety monitoring with operational intelligence using cameras already on the plant floor. It flags restricted-zone entry, unsafe person-to-forklift proximity, and line congestion, delivering alerts with a summary, thumbnail, and short clip so floor supervisors and safety teams can respond quickly, with DeepSenseIQ available for broader plant-wide data triage.

VisualIQ for Government and Defense
Technical Capability Guide

Positioning and Overview
VisualIQ supports government and defense facilities with cloud or on-premises camera security, deployable to meet data sovereignty and residency requirements. It is part of a broader Trove-AI government stack alongside LEXSO (hardware, software, and deterrence with Constellis), DeepSenseIQ, VellumGuard, and CyberIQ.
Many enterprise surveillance platforms require proprietary hardware, which limits flexibility in government procurement and long equipment-refresh cycles. VisualIQ is built to run on hardware customers already own or plan to procure independently. VisualIQ is not meant to replace physical security personnel or human judgment. It acts as a software awareness layer; LEXSO is the platform for facilities that need physical deterrence capability alongside it.
1. Core Technical Architecture
VisualIQ is built as a modular pipeline: video ingestion, frame sampling, object detection, object tracking, scene understanding, behavior analysis, a rule engine, and event output to alerting, search, dashboard, and API. Deployment topology (cloud, on-premises, or hybrid) is chosen based on the facility's data residency requirements.
Layer
Purpose
Camera / NVR ingest
Connects to RTSP streams, ONVIF cameras, and NVR-restreamed video already installed at the facility.
Frame sampling
Processes small frames at low FPS by default, scaling up only when triggered.
Object detection
Detects people, vehicles, bags and objects, and camera health.
Object tracking
Computes trajectories, dwell time, and zone crossing across facility perimeters and checkpoints.
Scene and behavior analysis
Builds spatial and temporal understanding of activity across classified facility zones.
Rule engine
Applies facility zone classification, access schedules, and thresholds to determine whether an event is meaningful.
Event and alert layer
Generates alerts, evidence clips, metadata, and searchable events for security teams.
Dashboard / API
Shows facility status, recent events, and supports integration with existing access-control systems.

2. Camera and Video Capabilities
Supported or target video sources: RTSP camera streams, ONVIF cameras, NVR-restreamed video, and local video files for testing, deployable on-premises or in the cloud based on data residency requirements.
Deployment
Camera Range
Pilot
1 to 20 cameras (single facility or wing)
Single facility
20 to 50 cameras
Multi-building campus
50 to 200 cameras, using adaptive processing
Multi-site / agency-wide
200+ cameras across facilities

3. Real-Time Detection Capabilities
Initial detection classes: person, vehicle, bag/object, camera blocked or offline.
Later detection classes: restricted-perimeter entry, unattended object candidate in public-access areas, checkpoint crowd behavior, loitering near sensitive facility zones.
4. Facility-Specific Rule Engine
Generic AI says "person detected near perimeter." VisualIQ should say "a person entered the restricted perimeter zone with no corresponding access event."
Rule inputs: facility zone classification (public, controlled, restricted), time of day, access schedule, object type, dwell time, risk level of area, event severity.
Example rule logic
	•	If a person enters a designated restricted perimeter zone without a corresponding access-control event, create a critical alert.
	•	If an unattended object is detected in a public-access area near a sensitive facility, create a critical review alert.
	•	If a vehicle loiters near a checkpoint beyond a configured threshold, create a watch alert.
5. Zone-Based Awareness
Zones by facility classification: public access, controlled access, and restricted areas.
Example: movement in a public-access lobby is normal, but the same movement crossing into a restricted zone without a corresponding access event may require an alert.
6. Schedule-Aware Monitoring
Standard operating hours, restricted-area access windows, and after-hours periods.
Rules apply differently across these windows so routine staff movement during business hours is not mistaken for a security event.
7. Use Case Categories
Perimeter and Facility Security
	•	Restricted-zone entry detection
	•	After-hours access alerts
Checkpoint and Access Monitoring
	•	Vehicle loitering near checkpoints
	•	Crowd behavior at access points
Sensitive Area Protection
	•	Unattended object detection near sensitive facilities
	•	Restricted-area dwell-time alerts
Facility Operations
	•	Camera health across sprawling or remote government footprints
8. Alerting and Dashboard Capabilities
Alert fields: alert type, severity, camera/facility location, time, summary, confidence score, thumbnail, short clip, recommended action, status.
Alert channels: dashboard, email, secure messaging integration, and API integration with existing access-control and security operations systems.
Example alert
Critical, Perimeter Zone C. Person detected inside restricted perimeter with no corresponding access-control event. Evidence: 20-second clip available. Recommended action: security team should verify immediately.
9. Evidence Clip Capabilities
Typical clip policy: 10 seconds before event and 10 seconds after.
Evidence supports security team review, incident documentation, and false-positive review over time.
10. Privacy and Responsible AI Boundaries
	•	No facial recognition or biometric identity matching by default.
	•	No weapon detection claimed as a reliable MVP feature.
	•	Local-first or on-premises processing available to meet data residency requirements.
	•	Human review before escalation.
	•	Clear retention policy consistent with the facility's records requirements.
11. Deployment and Hardware Range
Deployment
Camera Range
Typical Hardware
Pilot
1 to 20 cameras
GPU workstation, on-premises or cloud
Single facility
20 to 50 cameras
Single GPU workstation or small server
Multi-building campus
50 to 200 cameras
Higher-end server, adaptive FPS
Multi-site / agency-wide
200+ cameras
DGX-class or multi-GPU server, adaptive scheduling

No hardware replacement required; deployable to whatever cameras and video management system a facility already has. Standalone VisualIQ pricing to be finalized; LEXSO is available where physical deterrence capability is also required.
12. Frequently Asked Questions
How is VisualIQ different from LEXSO?
VisualIQ is a software-only visual analytics layer. LEXSO, developed with Constellis, adds full-scale hardware, software, and deterrence capability for facilities that need more than software alone.
Does VisualIQ require proprietary hardware?
No. It runs on whatever cameras and video management system the facility already has or independently procures.
Can VisualIQ run fully on-premises for data residency requirements?
Yes. Deployment is available cloud, on-premises, or hybrid, based on the facility's data sovereignty requirements.
13. Manual-Ready Description
VisualIQ helps government and defense facilities extend existing camera infrastructure into a real-time security awareness layer, deployable on-premises or in the cloud to meet data residency requirements. It flags restricted-perimeter entry, unattended objects, and checkpoint anomalies, delivering alerts with a summary, thumbnail, and short clip so security teams can verify and respond quickly, with LEXSO available where physical deterrence capability is also needed.

VisualIQ for Critical Infrastructure and Utilities
Technical Capability Guide

Positioning and Overview
VisualIQ provides hardware-agnostic camera security across industrial, remote, and utility facility environments already on site, paired with DeepSenseIQ for offline data triage and VellumGuard for secure communication between distributed sites with intermittent connectivity.
Utilities and critical-infrastructure operators typically manage a mix of legacy and modern equipment across sprawling, often remote physical footprints. VisualIQ is built to integrate with that mix directly, rather than requiring a single-vendor hardware standard across every site. VisualIQ is not meant to replace field technicians or security personnel. It acts as a continuous awareness layer for sites no one can watch around the clock.
1. Core Technical Architecture
VisualIQ is built as a modular pipeline: video ingestion, frame sampling, object detection, object tracking, scene understanding, behavior analysis, a rule engine, and event output to alerting, search, dashboard, and API. For remote or unmanned sites, the pipeline is designed to run against intermittent connectivity, with VellumGuard available to move alerts and evidence securely between distributed nodes.
Layer
Purpose
Camera / NVR ingest
Connects to RTSP streams, ONVIF cameras, and legacy or modern NVR systems already on site.
Frame sampling
Processes small frames at low FPS by default, appropriate for remote or bandwidth-constrained sites.
Object detection
Detects people, vehicles, bags and objects, and camera health.
Object tracking
Computes trajectories, dwell time, and zone crossing across substations, perimeters, and equipment yards.
Scene and behavior analysis
Builds spatial and temporal understanding of activity at unmanned or lightly staffed sites.
Rule engine
Applies site-specific zones, schedules, and thresholds to determine whether an event is meaningful.
Event and alert layer
Generates alerts, evidence clips, metadata, and searchable events for operations and security teams.
Dashboard / API / VellumGuard
Shows site status and recent events; VellumGuard moves alerts and evidence securely where connectivity is intermittent.

2. Camera and Video Capabilities
Supported or target video sources: RTSP camera streams, ONVIF cameras, legacy and modern NVR systems, and local video files for testing, deployable at manned and unmanned sites alike.
Deployment
Camera Range
Pilot
1 to 10 cameras (single site, e.g., a substation)
Single facility
10 to 30 cameras
Multi-site
30 to 100 cameras across a regional footprint
Regional / utility-wide
100+ cameras across many remote and manned sites

3. Real-Time Detection Capabilities
Initial detection classes: person, vehicle, bag/object, camera blocked or offline.
Later detection classes: perimeter fence breach candidate, unattended object near critical equipment, loitering near substations or pipeline access points, motion anomalies at unmanned sites.
4. Site-Specific Rule Engine
Generic AI says "person detected at fence line." VisualIQ should say "a person crossed the perimeter fence line at an unmanned substation outside a scheduled maintenance window."
Rule inputs: site classification, maintenance schedule, object type, dwell time, zone entry, risk level of area, event severity.
Example rule logic
	•	If a person crosses a perimeter fence line at an unmanned site outside a scheduled maintenance window, create a critical alert.
	•	If a vehicle remains near critical equipment beyond a configured threshold with no matching work order, create a watch alert.
	•	If a camera at a remote site goes offline or is obstructed, escalate immediately given the lack of on-site staff to notice otherwise.
5. Zone-Based Awareness
Zones per perimeter fence line, equipment yard, substation access point, and pipeline right-of-way.
Example: a scheduled maintenance crew inside the equipment yard is normal, but the same activity outside a scheduled work order may require an alert.
6. Schedule-Aware Monitoring
Scheduled maintenance windows, contractor access windows, and after-hours periods for unmanned or lightly staffed sites.
Rules apply differently across these windows so routine maintenance activity is not mistaken for a security event.
7. Use Case Categories
Perimeter and Substation Security
	•	Fence-line breach detection
	•	Unauthorized access to substations or pipeline points
Unmanned Site Awareness
	•	Camera offline or obstructed alerts
	•	Motion anomalies at lightly staffed sites
Equipment and Asset Protection
	•	Unattended object detection near critical equipment
	•	Vehicle dwell time without a matching work order
Distributed Site Coordination
	•	Secure alert and evidence transport between remote nodes via VellumGuard
	•	DeepSenseIQ triage of field data collected at disconnected sites
8. Alerting and Dashboard Capabilities
Alert fields: alert type, severity, site/camera location, time, summary, confidence score, thumbnail, short clip, recommended action, status.
Alert channels: dashboard, email, SMS, and secure node-to-node transport via VellumGuard for sites with intermittent connectivity.
Example alert
Critical, Substation 7 Perimeter. Person detected crossing the fence line outside a scheduled maintenance window. Evidence: 20-second clip available. Recommended action: dispatch or security team should verify immediately.
9. Evidence Clip Capabilities
Typical clip policy: 10 seconds before event and 10 seconds after, queued locally and transported securely when connectivity allows.
Evidence supports operations and security review, incident documentation, and false-positive review over time.
10. Privacy and Responsible AI Boundaries
	•	No facial recognition or biometric identity matching by default.
	•	Local-first processing at remote or disconnected sites.
	•	Short event clips instead of constant cloud upload, appropriate for constrained bandwidth.
	•	Human review before escalation.
	•	Clear retention policy consistent with the operator's records requirements.
11. Deployment and Hardware Range
Deployment
Camera Range
Typical Hardware
Pilot
1 to 10 cameras
GPU workstation or edge kit, low FPS sampling
Single facility
10 to 30 cameras
Single GPU workstation or edge kit
Multi-site
30 to 100 cameras
Regional server or aggregated edge deployment
Regional / utility-wide
100+ cameras
DGX-class or multi-GPU server, adaptive scheduling

No hardware replacement required, and no single-vendor hardware standard required across sites. Standalone VisualIQ pricing to be finalized; DeepSenseIQ and VellumGuard are available as companion products for offline triage and secure distributed communication.
12. Frequently Asked Questions
Does this require replacing legacy camera equipment at older sites?
No. VisualIQ is built to integrate with a mix of legacy and modern equipment already in place, rather than requiring a single-vendor hardware standard.
How does this work at sites with unreliable connectivity?
VisualIQ processes locally where possible, and VellumGuard is available to move alerts and evidence securely between nodes when connectivity is intermittent.
Can VisualIQ monitor unmanned sites without on-site staff?
Yes. It is designed to escalate camera-health and perimeter events immediately at unmanned sites, where there is no on-site staff to otherwise notice an issue.
13. Manual-Ready Description
VisualIQ helps utilities and critical-infrastructure operators extend a mix of legacy and modern cameras already on site into a continuous security layer, even across remote or unmanned facilities. It flags perimeter breaches, unattended objects near equipment, and camera health issues, delivering alerts with a summary, thumbnail, and short clip so operations and security teams can respond quickly, with DeepSenseIQ and VellumGuard available for offline data triage and secure distributed communication.

