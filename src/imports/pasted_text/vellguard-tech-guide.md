VellumGuard Vertical Technical Capability Guides
Government and Defense, Critical Infrastructure and Utilities, and Healthcare Data Exchange (LomaHipe)

VellumGuard for Government and Defense
Technical Capability Guide

Positioning and Overview
VellumGuard is Trove-AI's zero-trust secure communications layer for controlled exchange between trusted edge nodes, without opening broad network access. In mission environments, laptops, edge servers, mission devices, and application endpoints need to move messages, files, and structured data securely, without giving every device broad network access, relying on a full enterprise collaboration suite, or depending on constant connectivity.
VellumGuard is part of Trove-AI's broader government and defense stack, alongside LEXSO, VisualIQ, DeepSenseIQ, and CyberIQ. It treats every endpoint as a controlled node: known, approved, and governed by policy before any communication occurs, rather than granting broad access once a device is inside the network.
1. Core Technical Architecture: The Trust Model
VellumGuard follows a simple trust model. Every node must move through enrollment and authentication before it can exchange anything, and every exchange is recorded for governance.
Stage
Purpose
Enroll the Node
Authorized administrators enroll approved devices, laptops, edge servers, or mission devices into the VellumGuard environment.
Authenticate and Authorize
Each node must prove its identity and receive policy authorization before it can communicate with another node.
Exchange Securely
Approved nodes exchange encrypted messages, files, and structured payloads directly with one another.
Audit and Govern
VellumGuard records delivery status, policy decisions, node health, errors, and revocation events.

2. Node Types and Network Capabilities
A node may be a laptop, edge server, mission device, or application endpoint. Before any communication occurs, the node must be known, approved, and governed by policy.
Deployment Scale
Typical Node Footprint
Pilot
A handful of nodes within a single unit or team
Program-level
Nodes across a program's devices, servers, and application endpoints
Theater or enclave-wide
Nodes across a deployed environment, spanning multiple units or locations

3. Core Security Capabilities
Capabilities include: node identity, encrypted sessions, message exchange, file transfer, structured data exchange, local queueing, retry and recovery, node health telemetry, revocation, and audit logging.
4. Mission Trust Policy Engine
Policy decisions govern not just whether a node can communicate, but with whom, under what data-sensitivity constraints, and for how long.
Policy inputs: node classification or clearance level, mission role, data sensitivity of the payload, current network state (connected or disconnected), and policy version in effect.
Example policy logic
	•	If a node's credentials are revoked, immediately block all further exchange attempts from that node and log the revocation event.
	•	If a node has not checked in within a configured window, flag it for health review before it is trusted with further exchanges.
	•	If a message payload exceeds the classification handling parameters of the receiving node, block the exchange and log the policy decision.
5. Connectivity and Resilience Capabilities
Edge communications are often unreliable. Devices may disconnect, reconnect, move between networks, or operate in constrained environments.
VellumGuard queues messages and files locally when a node is disconnected, and automatically retries and recovers once connectivity resumes, without requiring a person to manually resend anything.
6. Use Case Categories
Mission Device-to-Device Exchange
	•	Secure messaging and file transfer between laptops, edge servers, and mission devices
	•	No broad network access required for either party
Field Team Coordination Without Broad Network Access
	•	Structured data exchange between field teams and command systems
	•	Narrower footprint than a traditional VPN
Secure Handoff Between IQ-Family Nodes
	•	Moving cleared data, alerts, or evidence between VisualIQ or DeepSenseIQ nodes and central systems
	•	Policy-governed exchange rather than open network access
Node Revocation and Incident Response
	•	Immediate revocation of a compromised or lost device's access
	•	Audit trail supporting incident investigation
7. Governance and Audit Dashboard Capabilities
Dashboard fields: node identity and status, exchange and delivery status, policy decisions, node health telemetry, revocation events, and audit history.
Governance channels: dashboard, exportable audit report, API integration with the organization's own security operations tooling.
Example governance record
Revoked, Node MD-1147. Credentials revoked following device loss report. All pending exchange attempts blocked and logged. Reviewed by: program security officer.
8. Evidence and Audit Trail Capabilities
Every exchange, policy decision, and node-health event is recorded, creating an auditable history of what was sent, to which node, and under what policy.
Revocation events and node health telemetry are retained to support program security review and incident response.
9. Responsible Security and Data Handling Boundaries
	•	VellumGuard governs the communications layer; it does not inspect or alter the clinical, operational, or mission content of a payload beyond what policy requires.
	•	Access to enrollment, policy configuration, and audit logs should follow the program's existing access-control and clearance requirements.
	•	Retention of audit logs should follow the program's existing records and classification handling policy.
10. Deployment and Environment Range
Environment
Typical Deployment
Laptop / mission device
Local VellumGuard client for node identity, encrypted sessions, and local queueing
Edge server
Node-to-node exchange and local audit logging at a forward location
Central program system
Governance dashboard, policy configuration, and audit aggregation

The initial prototype uses internet transport, and the architecture is designed to support additional transports over time.
11. Frequently Asked Questions
Does VellumGuard replace a traditional VPN?
No. A VPN can give a connected device broad access once inside the network. VellumGuard treats every endpoint as a controlled node that must be known, approved, and governed by policy before any communication occurs.
How does VellumGuard handle intermittent connectivity?
It queues messages and files locally when a node is disconnected, and automatically retries and recovers once connectivity resumes.
Can a revoked node reconnect automatically?
No. Revocation blocks further exchange attempts from that node until an administrator re-enrolls and re-authorizes it.
12. Manual-Ready Description
VellumGuard helps government and defense teams move messages, files, and structured data securely between trusted laptops, edge servers, and mission devices, without opening broad network access. Every node is enrolled, authenticated, and governed by policy before it communicates, with local queueing and automatic retry for intermittent connectivity, and a full audit trail of every exchange, policy decision, and revocation event.

VellumGuard for Critical Infrastructure and Utilities
Technical Capability Guide

Positioning and Overview
VellumGuard provides secure node-to-node communication for distributed infrastructure sites with intermittent connectivity. Utilities and critical-infrastructure operators manage substations, remote sites, and field crews that need to exchange operational data, structured payloads, and coordinate securely, without granting broad network access across a sprawling and often mixed legacy and modern footprint.
VellumGuard is often paired with DeepSenseIQ, which triages field-collected and live-feed data at the edge, and VisualIQ, which monitors site cameras; VellumGuard is the layer that moves the resulting alerts, evidence, and structured data between sites and central systems securely.
1. Core Technical Architecture: The Trust Model
VellumGuard follows a simple trust model, applied here to the mix of field devices, remote site servers, and central operations systems a utility operates across its footprint.
Stage
Purpose
Enroll the Node
Authorized administrators enroll approved field devices, remote-site servers, and central application endpoints into the VellumGuard environment.
Authenticate and Authorize
Each node must prove its identity and receive policy authorization before it can communicate with another node.
Exchange Securely
Approved nodes exchange encrypted messages, files, and structured payloads, including cleared data from DeepSenseIQ or events from VisualIQ.
Audit and Govern
VellumGuard records delivery status, policy decisions, node health, errors, and revocation events across the distributed footprint.

2. Node Types and Network Capabilities
A node may be a field technician's device, a remote-site edge server, or a central operations application endpoint. Before any communication occurs, the node must be known, approved, and governed by policy.
Deployment Scale
Typical Node Footprint
Pilot
Nodes at a single remote site, such as one substation
Multi-site
Nodes across a regional footprint of remote and manned sites
Regional / utility-wide
Nodes across the operator's full distributed footprint, including central systems

3. Core Security Capabilities
Capabilities include: node identity, encrypted sessions, message exchange, file transfer, structured data exchange, local queueing, retry and recovery, node health telemetry, revocation, and audit logging.
4. Site Trust Policy Engine
Policy decisions govern which nodes can exchange data with which other nodes, so a compromised or misconfigured field device cannot reach systems outside its intended scope.
Policy inputs: site classification, node role (field device, site server, or central system), data sensitivity, and current connectivity state.
Example policy logic
	•	If a field device attempts to exchange data with a node outside its enrolled site group, block the attempt and log the policy decision.
	•	If a remote-site node has not reported health telemetry within a configured window, flag it for review.
	•	When cleared data from DeepSenseIQ triage at a site is ready for transport, queue it and securely exchange it with the central system once connectivity resumes.
5. Connectivity and Resilience Capabilities
Remote and unmanned sites often have intermittent or no connectivity. VellumGuard queues messages, files, and structured payloads locally at the site.
When connectivity resumes, queued exchanges are automatically retried and delivered, without requiring a technician to manually resend data collected while offline.
6. Use Case Categories
Field Crew to Central System Handoff
	•	Secure transport of inspection data and structured payloads from field devices to central operations
	•	No broad network access granted to field devices
Remote and Unmanned Site Coordination
	•	Node-to-node exchange between remote sites and regional or central systems
	•	Local queueing during connectivity gaps
DeepSenseIQ Cleared-Data Transport
	•	Secure movement of triaged, cleared data from a remote site to central systems
	•	Policy-governed exchange rather than open network access
Node Health and Revocation Management
	•	Health telemetry across a distributed footprint of field devices and site servers
	•	Immediate revocation of a lost or compromised device's access
7. Governance and Audit Dashboard Capabilities
Dashboard fields: node identity and status, exchange and delivery status, policy decisions, node health telemetry, revocation events, and audit history.
Governance channels: dashboard, exportable audit report, API integration with the organization's own security operations tooling.
Example governance record
Flagged, Node SUB-07-EDGE. No health telemetry reported for 48 hours. Recommended action: dispatch or remote diagnostic check before resuming trusted exchange.
8. Evidence and Audit Trail Capabilities
Every exchange, policy decision, and node-health event is recorded, creating an auditable history across the operator's distributed footprint.
Revocation events and node health telemetry are retained to support operations review and incident response.
9. Responsible Security and Data Handling Boundaries
	•	VellumGuard governs the communications layer; it does not inspect or alter the operational content of a payload beyond what policy requires.
	•	Access to enrollment, policy configuration, and audit logs should follow the operator's existing access-control requirements.
	•	Retention of audit logs should follow the operator's existing records policy.
10. Deployment and Environment Range
Environment
Typical Deployment
Field technician device
Local VellumGuard client for node identity, encrypted sessions, and local queueing
Remote site edge server
Node-to-node exchange and local audit logging at the site
Central operations system
Governance dashboard, policy configuration, and audit aggregation across sites

The initial prototype uses internet transport, and the architecture is designed to support additional transports over time, well suited to sites with intermittent connectivity given local queueing and retry.
11. Frequently Asked Questions
How is this different from a traditional VPN for utility field devices?
A VPN can give a connected device broad access once inside the network. VellumGuard treats every device as a controlled node that must be enrolled, authenticated, and governed by policy before it can exchange anything.
Does this require constant connectivity at every remote site?
No. VellumGuard queues data locally at the site and automatically retries delivery once connectivity resumes.
What happens if a field device is lost or stolen?
An administrator can revoke that node's credentials, blocking all further exchange attempts and logging the revocation event for audit.
12. Manual-Ready Description
VellumGuard helps utilities and critical-infrastructure operators move data securely between field devices, remote sites, and central systems, without opening broad network access across a mixed legacy and modern footprint. It queues data locally when connectivity is intermittent, retries automatically once a connection resumes, and keeps a full audit trail of every exchange, policy decision, and revocation event across a distributed operating footprint.

VellumGuard for Healthcare Data Exchange
Technical Capability Guide: VellumGuard Within the LomaHipe Health Data Trust

Positioning and Overview
VellumGuard is integrated into LomaHipe, Trove-AI's sister initiative building a health data trust for secure, verifiable exchange of health data across organizations, as its secure communications layer. Within that trust, VellumGuard governs node enrollment, authentication, and audit for every exchange of health data between participating institutions.
Health data trusts require secure, verifiable exchange across organizations that each run their own systems, without granting broad network access between participants. VellumGuard treats each participating institution's endpoint as a controlled node: known, approved, and governed by policy before any exchange occurs. LomaHipe is hosted at its own domain and is not part of the trove-ai.com site; VellumGuard's role here is specifically as the trust's communications layer.
1. Core Technical Architecture: The Trust Model
VellumGuard follows its standard trust model, applied here to participating institutions and their integration points within the LomaHipe health data trust.
Stage
Purpose
Enroll the Node
Trust administrators enroll approved institutional endpoints and integration gateways into the VellumGuard environment.
Authenticate and Authorize
Each participating node must prove its identity and receive policy authorization scoped to its data-sharing agreement before it can exchange data.
Exchange Securely
Approved institutional nodes exchange encrypted health data messages, files, and structured payloads within the scope of their agreement.
Audit and Govern
VellumGuard records delivery status, policy decisions, node health, errors, and revocation events for every exchange across the trust.

2. Node Types and Network Capabilities
A node in this context is a participating institution's endpoint, an application-to-application integration point such as an EHR export gateway, or a data trust administrative node. Before any exchange occurs, the node must be known, approved, and governed by policy.
Deployment Scale
Typical Node Footprint
Pilot
A small number of participating institutions exchanging a limited data set
Multi-institution
Multiple participating institutions and their integration gateways
Trust-wide
The full set of institutions and application integration points participating in the LomaHipe trust

3. Core Security Capabilities
Capabilities include: node identity, encrypted sessions, message exchange, file transfer, structured data exchange, local queueing, retry and recovery, node health telemetry, revocation, and audit logging.
4. Data-Sharing Agreement Policy Engine
Policy decisions govern exchange according to each institution's specific data-sharing agreement, so a node can only exchange the data types and with the counterparties its agreement covers.
Policy inputs: participating institution identity, scope of the data-sharing agreement, data sensitivity classification, and node health status.
Example policy logic
	•	If a node attempts to exchange data outside the scope of its data-sharing agreement, block the exchange and log the policy decision for trust administrator review.
	•	If a participating institution's node fails authentication, deny the exchange and flag it for trust administrator review.
	•	If a node has been inactive beyond a configured threshold, flag it for re-verification before it resumes exchange within the trust.
5. Connectivity and Resilience Capabilities
Participating institutions may have varying connectivity and system availability. VellumGuard queues messages and files locally when a node is temporarily unavailable.
Once the node reconnects, queued exchanges are automatically retried and delivered within the bounds of its data-sharing agreement.
6. Use Case Categories
Institution-to-Institution Health Data Exchange
	•	Secure exchange of health data between participating institutions
	•	Exchange scoped to each institution's specific data-sharing agreement
Application-to-Application Integration
	•	Secure connections between EHR export gateways and other institutional integration points
	•	No broad network access granted between institutions' systems
Trust-Wide Audit and Governance
	•	Full audit trail of every exchange, policy decision, and node-health event across the trust
	•	Support for trust administrators reviewing participation and compliance
Node Enrollment and Revocation for Participating Institutions
	•	Structured onboarding of new institutions into the trust
	•	Revocation of a participating node if an agreement ends or a security concern arises
7. Governance and Audit Dashboard Capabilities
Dashboard fields: node identity and status, exchange and delivery status, policy decisions, node health telemetry, revocation events, and audit history.
Governance channels: dashboard, exportable audit report, API integration with the organization's own security operations tooling.
Example governance record
Blocked, Node INST-14-GATEWAY. Exchange attempt outside the scope of the node's data-sharing agreement. Logged for trust administrator review.
8. Evidence and Audit Trail Capabilities
Every exchange, policy decision, and node-health event is recorded, creating an auditable history of what was exchanged, between which institutions, and under which agreement.
Revocation events and node health telemetry are retained to support trust governance and institutional compliance review.
9. Responsible Security and Data Handling Boundaries
	•	VellumGuard governs the communications layer between institutions; it does not itself store or interpret the clinical content of the health data being exchanged.
	•	Exchange is scoped to each institution's specific data-sharing agreement, not broad network access between participants.
	•	Access to enrollment, policy configuration, and audit logs should follow the trust's own governance and compliance requirements.
	•	Retention of audit logs should follow the trust's own records policy, in coordination with participating institutions' compliance obligations.
10. Deployment and Environment Range
Environment
Typical Deployment
Institutional endpoint
Local VellumGuard client integrated with the institution's export or exchange system
Application integration gateway
Node-to-node exchange for EHR or other system-to-system integrations
Trust administrative system
Governance dashboard, policy configuration, and audit aggregation across the trust

The initial prototype uses internet transport, and the architecture is designed to support additional transports over time. LomaHipe is hosted at its own permanent domain; see lomahipe.com for details on the broader health data trust initiative.
11. Frequently Asked Questions
Is this the same as CyberIQ's healthcare guide?
No. CyberIQ addresses IT security and compliance monitoring for a health system's own network, logs, and applications. VellumGuard is the secure communications layer governing data exchange between institutions participating in the LomaHipe health data trust.
Does this replace a hospital's own IT systems?
No. VellumGuard governs how approved nodes exchange data with each other. It does not replace a participating institution's own systems.
What is LomaHipe?
LomaHipe is Trove-AI's sister initiative building a health data trust for secure, verifiable exchange of health data across organizations. It is hosted at its own domain, lomahipe.com, separate from trove-ai.com.
12. Manual-Ready Description
VellumGuard serves as the secure communications layer within the LomaHipe health data trust, governing enrollment, authentication, and audit for every exchange of health data between participating institutions. Each node, whether an institutional endpoint or an application integration gateway, is enrolled, authenticated, and scoped to its specific data-sharing agreement before it can exchange anything, with a full audit trail of every exchange and policy decision across the trust.
