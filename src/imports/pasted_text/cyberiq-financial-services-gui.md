CyberIQ Vertical Technical Capability Guides
Financial Services, Government and Defense, and Healthcare IT

CyberIQ for Financial Services
Technical Capability Guide

Positioning and Overview
CyberIQ helps financial services firms stop breaches at the source. It secures code before it ships, detects anomalies in real time across system and application logs, and explains every threat in full context, with CodeIQ and LogIQ leading the deployment. NetworkIQ is available as firms extend coverage into network-layer detection.
Financial services environments carry constant exposure through customer-facing APIs, core banking systems, and a dense compliance surface (PCI-DSS, SOX, GLBA, and examiner expectations). CyberIQ is not meant to replace security engineers, compliance teams, or human judgment. It acts as an intelligence layer that explains findings in plain language and recommends a specific next action.
1. Core Technical Architecture
Source code and repositories, application and system logs, and (optionally) network traffic feed CyberIQ's three modules. Each module normalizes its signal type, then a correlation layer connects findings across modules so a single vulnerability or anomaly is understood in context rather than in isolation.
Layer
Purpose
CodeIQ (Code Intelligence)
Reads source code and repositories to find vulnerabilities, unsafe patterns, and exposed secrets before deployment.
LogIQ (System Intelligence)
Reads system and application logs to detect anomalous behavior, brute-force attempts, and unauthorized access.
NetworkIQ (Network Intelligence)
Reads packets and connections to detect intrusions, lateral movement, and abnormal traffic (optional for firms extending beyond code and logs).
Correlation engine
Connects a code-level finding to a log-level detection rule, so a vulnerability found in code becomes something LogIQ actively watches for in production.
Rule and risk engine
Applies compliance mappings, severity scoring, and firm-specific policy to correlated findings.
Finding and alert layer
Stores findings, evidence, remediation guidance, and status for engineering and compliance review.
Dashboard
Shows repository health, open findings, compliance mapping status, and remediation trends.

2. Data Source and Integration Capabilities
CyberIQ integrates directly into developer workflow (Visual Studio Code), CI/CD pipelines, and log/SIEM infrastructure already in place. No rebuild of existing tooling is required.
Deployment Scale
Typical Coverage
Pilot
1 to 3 repositories or a single application, plus its associated logs
Team-level
One engineering team's full repository set and CI/CD pipeline
Business-unit
Multiple applications and shared services across a business unit
Enterprise
Full repository estate, CI/CD fleet, and centralized log infrastructure

3. Real-Time Detection Capabilities
CodeIQ findings: SQL injection and other injection patterns, hardcoded secrets and credentials, insecure deserialization, unsafe API usage, outdated or vulnerable dependencies.
LogIQ findings: brute-force and credential-stuffing patterns, anomalous access to customer account data, privilege escalation attempts, off-hours administrative activity.
NetworkIQ findings (where deployed): unusual outbound connections, lateral movement between segments, abnormal traffic volume or destination patterns.
4. Financial Services Rule and Risk Engine
Most tools report a rule violation and stop. CyberIQ explains why a finding matters in a financial services context and what to do about it: not "CWE-89 violated," but "this endpoint accepts unauthenticated input into a query against customer account data."
Rule inputs: code location and repository, data sensitivity of the system involved, log source, access pattern, time of day, prior findings on the same system, applicable compliance framework, severity.
Example rule logic
	•	If a code change introduces unparameterized query construction against a customer-data table, flag as a critical finding and block the pipeline stage pending review.
	•	If LogIQ detects repeated failed authentication attempts against an account-servicing system outside normal patterns, generate a high-severity alert.
	•	If a previously flagged CodeIQ vulnerability class appears again in a different repository, correlate and surface as a systemic pattern rather than a one-off finding.
5. Cross-Layer Correlation
A SQL injection vulnerability found by CodeIQ in a customer-search endpoint automatically becomes a detection rule in LogIQ, watching production logs for query patterns consistent with an attempted exploit of that same weakness.
An anomaly flagged by LogIQ (unusual access to a specific service) can trigger a targeted CodeIQ review of that service's recent commits, closing the loop between what changed in code and what is being observed in production.
6. Compliance and Framework Awareness
	•	PCI-DSS: secure coding and access-logging patterns relevant to cardholder data environments.
	•	SOX: change-control and audit-trail relevant findings for financial reporting systems.
	•	GLBA: safeguarding of customer financial information across code and access-log findings.
	•	Note: CyberIQ maps findings to these frameworks for engineering and compliance visibility. It does not issue a compliance certification on its own.
7. Use Case Categories
Secure API and Application Development
	•	Injection and unsafe-query detection before deployment
	•	Insecure credential handling in customer-facing services
	•	Secure code suggestions preserving existing business logic
Fraud-Adjacent Anomaly Detection
	•	Unusual account-access patterns in logs
	•	Privilege escalation and insider-threat indicators
	•	Correlation between code changes and post-deployment access anomalies
Legacy Core-System Modernization
	•	Identifying deprecated APIs and insecure patterns in legacy Java, .NET, or COBOL-adjacent services
	•	Reducing technical debt while preserving business logic
Software Supply Chain Security
	•	Vulnerable or outdated third-party dependency detection
	•	License and upgrade-path recommendations for open-source components
8. Alerting and Dashboard Capabilities
Finding fields: finding type, severity, affected system or repository, reference (CWE or rule ID), confidence, recommended remediation, related signals, status (new/acknowledged/resolved/false positive).
Alert channels: dashboard, email, Slack or Microsoft Teams webhook, ticketing system integration (Jira, ServiceNow), CI/CD pipeline gate.
Example finding
Critical, Customer Search Service. Potential SQL injection vulnerability detected in a query against customer account data. Recommendation: replace string concatenation with parameterized queries. Suggested secure implementation attached. Status: new.
9. Evidence and Audit Trail Capabilities
Every finding preserves the code diff, log excerpt, or network signal that produced it, along with the specific rule or pattern that fired.
Findings support engineering remediation, compliance audit review, and pattern tracking across repositories over time.
10. Responsible AI and Operating Boundaries
	•	CyberIQ analyzes code, logs, and (where deployed) network metadata, not customer account contents directly.
	•	Findings are surfaced for engineering and security review; CyberIQ does not take autonomous remediation action in production without human approval.
	•	Access to findings and dashboards should follow the firm's existing role-based access controls.
	•	Retention of findings and evidence should follow the firm's existing audit and retention policy.
11. Deployment and Environment Range
Environment
Typical Deployment
Developer workstation / IDE
Visual Studio Code extension for real-time CodeIQ feedback during development
CI/CD pipeline
CodeIQ evaluation gate on commits, pull requests, and release candidates
Cloud or on-premises
LogIQ and NetworkIQ deployment aligned to the firm's existing log and network infrastructure

Pricing model to be finalized; planned to use the VisualIQ pricing framework as a reference point, with financial-services-specific tiers.
12. Frequently Asked Questions
Does CyberIQ replace our SOC or compliance team?
No. CyberIQ surfaces explained, prioritized findings. Security engineers and compliance teams still make every remediation and reporting decision.
Can CyberIQ certify us as PCI-DSS or SOX compliant?
No. CyberIQ maps relevant findings to these frameworks to support a firm's own compliance process. It does not issue certifications.
Does CyberIQ require replacing our existing SIEM or CI/CD tooling?
No. CyberIQ integrates into Visual Studio Code, existing CI/CD pipelines, and existing log infrastructure.
13. Manual-Ready Description
CyberIQ helps financial services firms catch vulnerabilities in customer-facing code before it ships and detect anomalies in production logs as they happen, with CodeIQ and LogIQ leading the deployment. Findings are explained in plain language, mapped to relevant compliance frameworks like PCI-DSS and SOX, and paired with a specific recommended fix, so engineering and compliance teams can act quickly instead of parsing raw rule violations.

CyberIQ for Government and Defense
Technical Capability Guide

Positioning and Overview
CyberIQ is proving out in the hardest environments first: defense and intelligence community customers who need air-gapped deployment and adversarial code analysis, before extending to critical infrastructure, financial services, and healthcare. CodeIQ, LogIQ, and NetworkIQ all support disconnected or classified-network operation.
Government and defense environments carry both a defensive requirement (secure mission software before it ships) and an offensive intelligence requirement (rapidly assess adversarial or nation-state code). CyberIQ is not meant to replace security engineers, cleared analysts, or authorizing officials. It acts as an intelligence layer that explains findings in context and recommends next actions.
1. Core Technical Architecture
Source code and repositories, system and application logs, and network traffic feed CyberIQ's three modules, with the architecture built to run fully disconnected from the internet where mission requirements demand it. A correlation layer connects findings across modules so a code-level weakness, a log-level anomaly, and a network-level signal are understood as one picture rather than three.
Layer
Purpose
CodeIQ (Code Intelligence)
Reads source code and repositories, including adversarial or captured code samples, to find vulnerabilities, unsafe patterns, and exploitable weaknesses.
LogIQ (System Intelligence)
Reads system and application logs to detect anomalous behavior, unauthorized access, and signs of compromise.
NetworkIQ (Network Intelligence)
Reads packets and connections to detect intrusions, lateral movement, and abnormal traffic.
Correlation engine
Connects a code-level finding to a log-level detection rule and a network-level signal across the same mission system.
Rule and risk engine
Applies mission-specific policy, classification-aware handling, and severity scoring to correlated findings.
Finding and evidence layer
Stores findings, evidence, and review artifacts consistent with software assurance documentation practices.
Dashboard
Shows mission-system health, open findings, and review-artifact status for program and security teams.

2. Data Source and Integration Capabilities
CyberIQ integrates into Visual Studio Code, program CI/CD pipelines, and existing log and network infrastructure. Air-gapped deployment is a first-class supported configuration, not a retrofit.
Deployment Scale
Typical Coverage
Pilot / single program
One mission application and its associated logs, evaluated in a disconnected environment
Program-level
A program's full repository set, CI/CD pipeline, and log infrastructure
Agency-level
Multiple programs across an agency or component, with centralized review artifacts
Air-gapped enclave
Fully disconnected deployment for classified or otherwise isolated networks

3. Real-Time Detection Capabilities
CodeIQ findings: vulnerabilities and unsafe patterns in mission software, exposed secrets, insecure deserialization, and rapid vulnerability mapping in adversarial or captured code samples.
LogIQ findings: anomalous behavior, unauthorized access attempts, and signs of compromise across mission-system logs.
NetworkIQ findings: intrusions, lateral movement, and abnormal traffic patterns across program networks.
4. Government and Defense Rule and Risk Engine
Most tools report a rule violation and stop. CyberIQ explains why a finding matters for a mission system: not "rule violated," but "this interface accepts unauthenticated input into a component handling mission-critical data."
Rule inputs: code location and program, classification handling requirements, log source, access pattern, time of day, prior findings on the same system, applicable software assurance standard, severity.
Example rule logic
	•	If a code change introduces an unauthenticated input path into a mission-critical component, flag as a critical finding for program security review.
	•	If LogIQ detects unauthorized access attempts against a mission system outside normal patterns, generate a high-severity alert for the security operations team.
	•	If CodeIQ identifies a known vulnerability class in an adversarial or captured code sample, generate an intelligence-mapping finding distinct from a defensive-scan finding.
5. Cross-Layer Correlation
A vulnerability found by CodeIQ in a mission-system component automatically becomes a detection rule in LogIQ, watching for access patterns consistent with an attempted exploit of that same weakness.
A network-level anomaly flagged by NetworkIQ can trigger a targeted CodeIQ review of the affected system's recent code changes, closing the loop between code, logs, and network signal for the same mission system.
6. Compliance and Framework Awareness
	•	NIST 800-53 and the Risk Management Framework: findings mapped to relevant control families for program authorization support.
	•	Secure software development practices consistent with current federal software assurance initiatives.
	•	Note: CyberIQ generates review artifacts and mapped findings to support a program's authorization and assurance process. It does not issue an authorization to operate on its own.
7. Use Case Categories
Mission Software Assurance
	•	Evaluating mission software against organizational security standards
	•	Generating review artifacts to support software assurance initiatives
	•	Identifying common software weaknesses before deployment
Dual-Use Code Intelligence
	•	Defensive scanning of a program's own codebase before it ships
	•	Rapid vulnerability mapping in adversarial or nation-state code samples, a use case with no direct commercial equivalent
DevSecOps for Federal Pipelines
	•	Evaluating every commit, pull request, or release candidate in program CI/CD pipelines
	•	Reducing remediation costs by surfacing findings early in the development lifecycle
Air-Gapped and Disconnected Operations
	•	Full CodeIQ, LogIQ, and NetworkIQ operation without internet connectivity
	•	Evidence and findings retained locally within the enclave
8. Alerting and Dashboard Capabilities
Finding fields: finding type, severity, affected system or repository, reference (CWE or rule ID), confidence, recommended remediation, related signals, status (new/acknowledged/resolved/false positive).
Alert channels: dashboard, email, Slack or Microsoft Teams webhook, ticketing system integration (Jira, ServiceNow), CI/CD pipeline gate.
Example finding
Critical, Mission Component Alpha. Unauthenticated input path detected into a component handling mission-critical data. Recommendation: add authentication and input validation prior to next release candidate. Status: new.
9. Evidence and Audit Trail Capabilities
Every finding preserves the code diff, log excerpt, or network signal that produced it, along with the specific rule or pattern that fired.
Findings and review artifacts support program security review, authorization packages, and pattern tracking across systems over time, consistent with software assurance documentation practices.
10. Responsible AI and Operating Boundaries
	•	CyberIQ operates within the program's classification and handling requirements; air-gapped deployment keeps analysis fully disconnected where required.
	•	Findings are surfaced for program security teams and authorizing officials; CyberIQ does not take autonomous remediation action without human approval.
	•	Access to findings and dashboards should follow the program's existing access-control and clearance requirements.
	•	Retention of findings and evidence should follow the program's existing records and classification handling policy.
11. Deployment and Environment Range
Environment
Typical Deployment
Developer workstation / IDE
Visual Studio Code extension for real-time CodeIQ feedback during development, including disconnected workstations
Program CI/CD pipeline
CodeIQ evaluation gate on commits, pull requests, and release candidates
Air-gapped enclave
Fully disconnected LogIQ and NetworkIQ deployment for classified or isolated networks

Pricing model to be finalized; planned to use the VisualIQ pricing framework as a reference point, with a defense and intelligence community tier reflecting air-gapped deployment requirements.
12. Frequently Asked Questions
Can CyberIQ run fully disconnected from the internet?
Yes. Air-gapped deployment is a first-class supported configuration for defense and intelligence community environments.
Does CyberIQ's adversarial code analysis mean it performs offensive actions?
No. CodeIQ maps vulnerabilities in adversarial or captured code samples for intelligence purposes. It does not take autonomous offensive action.
Does CyberIQ grant an authorization to operate?
No. It generates findings and review artifacts that support a program's own authorization and software assurance process.
13. Manual-Ready Description
CyberIQ helps government and defense programs secure mission software before it ships and detect anomalies across logs and network traffic in disconnected or classified environments. CodeIQ's dual-use design also supports rapid vulnerability mapping in adversarial or nation-state code, a capability with no direct commercial equivalent. Findings are explained in plain language, mapped to relevant software assurance standards, and paired with review artifacts so program security teams can act quickly.

CyberIQ for Healthcare IT Teams
Technical Capability Guide

Positioning and Overview
CyberIQ is available for healthcare IT teams, with LogIQ and NetworkIQ leading for compliance and ransomware-defense use cases. This is a distinct capability from CareIQ, which addresses physical patient and staff safety. CyberIQ addresses the IT security and compliance layer behind electronic health records, patient portals, and connected medical devices.
Healthcare IT environments face a specific combination of pressures: ransomware groups actively target hospital networks, EHR access needs continuous audit-trail support, and connected medical devices expand the attack surface. CyberIQ is not meant to replace healthcare IT security staff or compliance officers. It acts as an intelligence layer that explains findings in plain language and recommends a specific next action.
1. Core Technical Architecture
System and application logs and network traffic feed LogIQ and NetworkIQ as the lead modules for this vertical. CodeIQ is available as a secondary module for organizations building or maintaining custom patient-facing applications, portals, or HL7/FHIR integrations. A correlation layer connects findings across modules.
Layer
Purpose
LogIQ (System Intelligence)
Reads EHR and application access logs to detect unauthorized access, unusual audit-trail patterns, and signs of compromise.
NetworkIQ (Network Intelligence)
Reads packets and connections to detect ransomware-consistent lateral movement, abnormal traffic, and connected medical device anomalies.
CodeIQ (Code Intelligence, secondary)
Reads source code for custom patient portals, APIs, and HL7/FHIR integrations to find vulnerabilities before deployment.
Correlation engine
Connects a network-level anomaly to related log-level access patterns, so early ransomware indicators are understood in context.
Rule and risk engine
Applies HIPAA-relevant access-pattern rules and ransomware-indicator scoring to correlated findings.
Finding and alert layer
Stores findings, evidence, and audit-relevant detail for IT security and compliance review.
Dashboard
Shows system health, open findings, and audit-log-relevant activity trends.

2. Data Source and Integration Capabilities
CyberIQ integrates with existing EHR access logs, network infrastructure, and (where applicable) the organization's application repositories, without requiring a rebuild of clinical or IT systems already in place.
Deployment Scale
Typical Coverage
Pilot
A single EHR system or network segment and its associated logs
Department-level
One facility's clinical network and access logs
Health system
Multiple facilities' networks, logs, and shared application repositories
Enterprise
Full health-system network, log infrastructure, and application estate

3. Real-Time Detection Capabilities
LogIQ findings: unauthorized or unusual EHR access patterns, off-hours administrative activity, repeated failed authentication attempts, audit-trail anomalies relevant to compliance review.
NetworkIQ findings: lateral movement patterns consistent with early-stage ransomware, abnormal traffic to or from connected medical devices, unusual outbound connections.
CodeIQ findings (secondary): vulnerabilities and unsafe patterns in patient portals, custom APIs, and HL7/FHIR integration code.
4. Healthcare IT Rule and Risk Engine
Most tools report a log anomaly or network alert and stop. CyberIQ explains why a finding matters in a healthcare context: not "anomalous login," but "this access pattern is consistent with unauthorized viewing of patient records outside assigned care responsibilities."
Rule inputs: log source, access pattern, user role, time of day, network segment, device type, prior findings on the same system, applicable compliance framework, severity.
Example rule logic
	•	If LogIQ detects EHR access outside a user's assigned care responsibilities or normal pattern, generate a high-severity access-review alert.
	•	If NetworkIQ detects lateral movement consistent with early-stage ransomware behavior, generate a critical alert and recommend network segment isolation for review.
	•	If a connected medical device shows network traffic outside its expected baseline, generate a watch alert for the biomedical engineering and IT security teams.
5. Cross-Layer Correlation
A network-level anomaly flagged by NetworkIQ (early lateral movement) automatically triggers a LogIQ review of access activity on the affected systems, surfacing whether credentials tied to that movement have also shown unusual access patterns.
A CodeIQ finding in a patient portal's authentication logic automatically becomes a LogIQ watch rule, monitoring for access patterns consistent with an attempted exploit of that same weakness in production.
6. Compliance and Framework Awareness
	•	HIPAA: access-pattern and audit-trail findings relevant to the Security Rule's technical safeguards.
	•	Ransomware-defense best practices: early lateral-movement detection aligned to current healthcare-sector guidance.
	•	Note: CyberIQ surfaces findings relevant to these frameworks to support a health system's own compliance and security program. It does not issue a compliance certification on its own.
7. Use Case Categories
Ransomware Early Detection
	•	Lateral-movement pattern detection across the clinical network
	•	Correlated log and network findings for faster containment decisions
EHR Access Compliance
	•	Unauthorized or unusual access-pattern detection
	•	Audit-trail-relevant findings to support HIPAA Security Rule review
Connected Medical Device Monitoring
	•	Baseline network behavior for connected devices
	•	Anomaly detection without disrupting device operation
Secure Patient-Facing Application Development
	•	Vulnerability detection in patient portals and APIs before deployment
	•	Secure handling of authentication and session logic
8. Alerting and Dashboard Capabilities
Finding fields: finding type, severity, affected system or repository, reference (CWE or rule ID), confidence, recommended remediation, related signals, status (new/acknowledged/resolved/false positive).
Alert channels: dashboard, email, Slack or Microsoft Teams webhook, ticketing system integration (Jira, ServiceNow), CI/CD pipeline gate.
Example finding
Critical, Clinical Network Segment 4. Lateral-movement pattern consistent with early-stage ransomware behavior detected. Recommendation: isolate affected segment pending IT security review. Status: new.
9. Evidence and Audit Trail Capabilities
Every finding preserves the log excerpt, network signal, or code diff that produced it, along with the specific rule or pattern that fired.
Findings support IT security response, HIPAA-relevant audit review, and pattern tracking across the health system over time.
10. Responsible AI and Operating Boundaries
	•	CyberIQ analyzes access patterns, network signals, and code, not the clinical content of patient records themselves.
	•	Findings are surfaced for IT security and compliance review; CyberIQ does not take autonomous remediation action, such as isolating a network segment, without human approval.
	•	Access to findings and dashboards should follow the health system's existing role-based access controls.
	•	Retention of findings and evidence should follow the health system's existing HIPAA-aligned retention policy.
11. Deployment and Environment Range
Environment
Typical Deployment
Network infrastructure
NetworkIQ deployment across clinical network segments, cloud or on-premises
Log / SIEM infrastructure
LogIQ integration with existing EHR access logs and application logs
Developer workstation / IDE
Visual Studio Code extension for CodeIQ, where custom patient-facing applications are maintained

Pricing model to be finalized; planned to use the VisualIQ pricing framework as a reference point, with a healthcare-specific tier alongside CareIQ's patient-safety monitoring bundle.
12. Frequently Asked Questions
Is this the same as CareIQ's patient monitoring?
No. CareIQ addresses physical patient and staff safety through camera-based behavioral monitoring. CyberIQ addresses IT security: EHR access, network behavior, and application code.
Does CyberIQ access patient medical records directly?
No. It analyzes access patterns, network signals, and code, not the clinical content of patient records.
Can CyberIQ stop a ransomware attack automatically?
CyberIQ can detect early lateral-movement indicators and recommend containment steps, such as segment isolation, but a human security team makes and executes that decision.
13. Manual-Ready Description
CyberIQ helps healthcare IT teams catch ransomware-consistent behavior early, flag unauthorized or unusual EHR access patterns, and secure patient-facing applications before they ship, with LogIQ and NetworkIQ leading the deployment. Findings are explained in plain language, mapped to HIPAA-relevant practices, and paired with a specific recommended action, so IT security and compliance teams can respond quickly.
