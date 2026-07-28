-- Resources & Insights CMS
-- Paste ALL of this into Supabase SQL Editor and run (Run and enable RLS is fine).

-- Clean slate if a previous attempt partially applied
drop table if exists public.blog_posts cascade;
drop table if exists public.resource_guides cascade;
drop table if exists public.resources_page_copy cascade;
drop table if exists public.resource_faqs cascade;

-- ─── Tables ─────────────────────────────────────────────────────────────────

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  product text not null default 'DeepSense',
  product_color text not null default '#1B6FE8',
  image_url text not null default '',
  excerpt text not null default '',
  body text not null default '',
  date_label text not null default '',
  read_time text not null default '5 min',
  tags text[] not null default '{}',
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.resource_guides (
  id uuid primary key default gen_random_uuid(),
  type text not null default 'Guide',
  title text not null,
  excerpt text not null default '',
  body text not null default '',
  product text not null default 'VisualIQ',
  product_color text not null default '#0EA5E9',
  date_label text not null default '',
  read_time text not null default '5 min',
  tags text[] not null default '{}',
  icon_key text not null default 'Camera',
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.resources_page_copy (
  id int primary key default 1 check (id = 1),
  hero_eyebrow text not null default 'Resources & Insights',
  hero_title text not null default 'Explore guides, FAQs, and expert insights.',
  hero_subtitle text not null default '',
  hero_note text not null default '',
  about_label text not null default 'About this publication',
  about_body text not null default '',
  cta_eyebrow text not null default 'Ready to go deeper?',
  cta_title text not null default 'See how these products work in the field.',
  cta_body text not null default '',
  updated_at timestamptz not null default now()
);

create table public.resource_faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null default '',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─── Triggers ───────────────────────────────────────────────────────────────

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

create trigger resource_guides_updated_at
  before update on public.resource_guides
  for each row execute function public.set_updated_at();

create trigger resources_page_copy_updated_at
  before update on public.resources_page_copy
  for each row execute function public.set_updated_at();

create trigger resource_faqs_updated_at
  before update on public.resource_faqs
  for each row execute function public.set_updated_at();

-- ─── RLS ────────────────────────────────────────────────────────────────────

alter table public.blog_posts enable row level security;
alter table public.resource_guides enable row level security;
alter table public.resources_page_copy enable row level security;
alter table public.resource_faqs enable row level security;

create policy "Public read published blog posts"
  on public.blog_posts for select
  using (published = true);

create policy "Public read published guides"
  on public.resource_guides for select
  using (published = true);

create policy "Public read page copy"
  on public.resources_page_copy for select
  using (true);

create policy "Public read published faqs"
  on public.resource_faqs for select
  using (published = true);

create policy "Auth all blog posts"
  on public.blog_posts for all
  to authenticated
  using (true)
  with check (true);

create policy "Auth all guides"
  on public.resource_guides for all
  to authenticated
  using (true)
  with check (true);

create policy "Auth all page copy"
  on public.resources_page_copy for all
  to authenticated
  using (true)
  with check (true);

create policy "Auth all faqs"
  on public.resource_faqs for all
  to authenticated
  using (true)
  with check (true);

create policy "Auth read all blog posts"
  on public.blog_posts for select
  to authenticated
  using (true);

create policy "Auth read all guides"
  on public.resource_guides for select
  to authenticated
  using (true);

create policy "Auth read all faqs"
  on public.resource_faqs for select
  to authenticated
  using (true);

-- ─── Storage ────────────────────────────────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('content-images', 'content-images', true)
on conflict (id) do nothing;

drop policy if exists "Public read content images" on storage.objects;
create policy "Public read content images"
  on storage.objects for select
  using (bucket_id = 'content-images');

drop policy if exists "Auth upload content images" on storage.objects;
create policy "Auth upload content images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'content-images');

drop policy if exists "Auth update content images" on storage.objects;
create policy "Auth update content images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'content-images');

drop policy if exists "Auth delete content images" on storage.objects;
create policy "Auth delete content images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'content-images');

-- ─── Seed page copy ─────────────────────────────────────────────────────────

insert into public.resources_page_copy (
  id, hero_eyebrow, hero_title, hero_subtitle, hero_note,
  about_label, about_body, cta_eyebrow, cta_title, cta_body
) values (
  1,
  $q$Resources & Insights$q$,
  $q$Explore guides, FAQs,
and expert insights.$q$,
  $q$Comparison guides and FAQ content on hardware-agnostic security, multi-sensor fusion, and AI surveillance compliance for government.$q$,
  $q$Resources publishes one new comparison or FAQ piece per month, building on the direct-answer content across Trove-AI's product and industry pages.$q$,
  $q$About this publication$q$,
  $q$Whether you're comparing solutions, reviewing technical requirements, or learning about AI technologies, Resources & Insights provides straightforward answers to the questions teams ask most often.$q$,
  $q$Ready to go deeper?$q$,
  $q$See how these products work in the field.$q$,
  $q$Every guide on this page connects to a live product. Explore the full Trove-AI platform to see the capabilities in context.$q$
);

-- ─── Seed guides ────────────────────────────────────────────────────────────

insert into public.resource_guides (
  type, title, excerpt, body, product, product_color, date_label, read_time, tags, icon_key, published, sort_order
) values
(
  $q$Comparison Guide$q$,
  $q$Hardware-Agnostic vs. Proprietary Video Surveillance$q$,
  $q$A detailed breakdown of deployment costs, integration complexity, and long-term flexibility between open-architecture camera systems and vendor-locked proprietary platforms.$q$,
  $q$Proprietary systems offer tight integration but extract long-term cost through licensing, hardware lock-in, and limited interoperability. Hardware-agnostic platforms like VisualIQ separate intelligence from infrastructure, turning any existing camera into a smart sensor without rip-and-replace. The operational savings over a five-year horizon consistently exceed 40% when procurement, maintenance, and upgrade cycles are modeled together.$q$,
  $q$VisualIQ$q$,
  $q$#0EA5E9$q$,
  $q$Jun 2025$q$,
  $q$8 min$q$,
  array[$q$Video Surveillance$q$, $q$Hardware$q$, $q$VisualIQ$q$],
  $q$Camera$q$,
  true,
  0
),
(
  $q$Explainer$q$,
  $q$What Is Hardware-Agnostic Multi-Sensor Fusion?$q$,
  $q$Multi-sensor fusion combines data from cameras, radar, LiDAR, acoustic sensors, and network telemetry into a single unified intelligence picture, without requiring proprietary hardware.$q$,
  $q$Rather than siloing each sensor type into its own management interface, DeepSenseIQ ingests heterogeneous sensor streams and correlates them at the reasoning layer, so a motion alert from a radar sensor and a corresponding camera detection are treated as a single event, not two separate incidents requiring manual correlation.$q$,
  $q$DeepSenseIQ$q$,
  $q$#10B981$q$,
  $q$May 2025$q$,
  $q$6 min$q$,
  array[$q$Sensor Fusion$q$, $q$Edge AI$q$, $q$DeepSenseIQ$q$],
  $q$Radio$q$,
  true,
  1
),
(
  $q$Compliance Guide$q$,
  $q$AI Surveillance Compliance for Government$q$,
  $q$Navigating FedRAMP, CJIS, FISMA, and IL4 requirements when deploying AI-powered surveillance and threat detection across federal and state agencies.$q$,
  $q$Federal AI deployments require more than a compliant data center. The AI models themselves must meet explainability standards, retain audit trails for every automated decision, and operate within boundaries defined by each agency's ATO. This guide maps Trove-AI's compliance posture across all major federal frameworks in effect as of 2025.$q$,
  $q$CyberIQ$q$,
  $q$#F97316$q$,
  $q$Apr 2025$q$,
  $q$10 min$q$,
  array[$q$Compliance$q$, $q$Government$q$, $q$FedRAMP$q$],
  $q$Shield$q$,
  true,
  2
);

-- ─── Seed FAQs ──────────────────────────────────────────────────────────────

insert into public.resource_faqs (question, answer, sort_order, published) values
(
  $q$How often is new content published?$q$,
  $q$Resources & Insights publishes one new comparison guide, explainer, or FAQ piece per month. Insights blog articles rotate across product lines on the same cadence.$q$,
  0,
  true
),
(
  $q$Do I need an account to read guides?$q$,
  $q$No. All Resources & Insights content is free, ungated, and available without a form or subscription.$q$,
  1,
  true
),
(
  $q$Can I request a topic?$q$,
  $q$Yes. Contact the Trove-AI team with a comparison, compliance, or technical topic you need covered and we will prioritize it in the editorial calendar when it aligns with platform capability.$q$,
  2,
  true
);

-- ─── Seed blog posts ────────────────────────────────────────────────────────

insert into public.blog_posts (
  slug, title, product, product_color, image_url, excerpt, body, date_label, read_time, tags, published
) values
(
  $q$why-government-ai-needs-explainability$q$,
  $q$Why Government AI Needs Explainability at the Decision Layer$q$,
  $q$DeepSense$q$,
  $q$#1B6FE8$q$,
  $q$https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080$q$,
  $q$As agencies deploy AI for threat detection and access control, auditability requirements demand models that can explain every alert, not just produce them.$q$,
  $q$Federal deployments under CJIS require chain-of-custody logging for every automated decision. DeepSense's inference layer surfaces confidence scores, contributing sensor weights, and historical baselines alongside each output, turning black-box AI into auditable policy.

Explainability is not a nice-to-have for government deployments. When an AI system flags an access attempt or recommends a response action, the agency needs to be able to document the decision trail. That documentation is the chain of custody.

DeepSense surfaces three things per output: a confidence score, the list of contributing signals with their relative weights, and a historical baseline comparison showing whether the pattern is anomalous relative to that specific system's prior activity. This means an analyst can answer a question from an oversight body, not with "the model said so," but with a specific, traceable explanation of why the threshold was crossed.$q$,
  $q$Jul 2025$q$,
  $q$7 min$q$,
  array[$q$Government$q$, $q$Explainability$q$, $q$Auditability$q$],
  true
),
(
  $q$edge-ai-perimeter-security$q$,
  $q$Edge AI for Perimeter Security: Offline-First Architecture$q$,
  $q$DeepSenseIQ$q$,
  $q$#10B981$q$,
  $q$https://images.unsplash.com/photo-1759104051385-61f17dabde16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080$q$,
  $q$When network connectivity isn't guaranteed at remote facilities, contested environments, or disaster zones, inference must happen at the edge.$q$,
  $q$DeepSenseIQ runs compressed model variants on-device, syncing detections to the cloud when bandwidth allows. This architecture supports deployments where data cannot leave the facility in real time.

The offline-first design is not just a technical feature. It is a requirement for a large category of physical environments: unmanned substations, forward operating bases, remote pipeline monitoring stations, and disaster-response staging areas. In all of these, treating cloud connectivity as a dependency is a structural risk.

DeepSenseIQ resolves this by keeping all inference local. When connectivity returns, findings are synced with a full audit trail intact. Nothing is dropped, and nothing is assumed about the connection state. The system operates the same whether it is online or isolated, which means operators can trust the output regardless of the infrastructure conditions at the site.$q$,
  $q$Jun 2025$q$,
  $q$6 min$q$,
  array[$q$Edge AI$q$, $q$Infrastructure$q$, $q$DeepSenseIQ$q$],
  true
),
(
  $q$zero-trust-physical-security$q$,
  $q$Zero Trust Physical Security: Why Software-Defined Access Changes Everything$q$,
  $q$VellumGuard$q$,
  $q$#14B8A6$q$,
  $q$https://images.unsplash.com/photo-1627227702786-f3268b95f980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080$q$,
  $q$Traditional access control is credential-based. VellumGuard adds behavioral context, location telemetry, and multi-factor physical verification, without ripping out existing infrastructure.$q$,
  $q$VellumGuard's node-to-node trust model means no single compromised credential unlocks a facility. Every access event is cross-validated against behavioral patterns and zone-level context before authorization is granted.

The credential model has a fundamental weakness: it trusts the credential, not the person holding it. A stolen badge, a coerced PIN, or a social-engineered authentication all look identical to a credential-only system. The system has no way to distinguish them.

VellumGuard addresses this by treating every node as an enrolled, policy-governed endpoint. Before a communication or access event is authorized, the node must pass identity verification, behavioral cross-validation, and a check against current zone-level policy. A credential that passes authentication but shows an anomalous time-of-day pattern, an unusual source node, or a destination outside its enrolled scope will be blocked and flagged, not waved through.$q$,
  $q$May 2025$q$,
  $q$8 min$q$,
  array[$q$Zero Trust$q$, $q$Physical Security$q$, $q$VellumGuard$q$],
  true
),
(
  $q$behavioral-ai-healthcare$q$,
  $q$Behavioral AI in Healthcare: Monitoring Without Surveillance$q$,
  $q$CareIQ$q$,
  $q$#8B5CF6$q$,
  $q$https://images.unsplash.com/photo-1513224502586-d1e602410265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080$q$,
  $q$CareIQ detects falls, distress patterns, and unsafe behaviors while maintaining patient dignity and regulatory compliance with state privacy law.$q$,
  $q$The system uses ambient sensor fusion rather than facial recognition, ensuring no personally identifiable biometric is stored. Alerts are behavioral, not identity-based, keeping clinical staff in control of escalation decisions.

The distinction matters significantly in healthcare. A system that identifies a patient by face and tracks their movement through a facility is a surveillance system. A system that detects a fall-candidate movement pattern in a known zone and routes an alert to the closest staff member is a safety layer. CareIQ is designed to be the latter.

This means the data model never includes a link between a detected event and a named individual unless a staff member makes that connection as part of their response. CareIQ flags the event, attaches a short evidence clip, and routes the alert. What happens next is a human decision. That structure is intentional, and it is what allows the system to operate in clinical environments where both safety and dignity matter.$q$,
  $q$Apr 2025$q$,
  $q$5 min$q$,
  array[$q$Healthcare$q$, $q$Privacy$q$, $q$CareIQ$q$],
  true
),
(
  $q$layered-security-physical-cyber$q$,
  $q$Layered Security: Integrating Physical AI with Cyber Threat Intelligence$q$,
  $q$LEXSO$q$,
  $q$#0EA5E9$q$,
  $q$https://images.unsplash.com/photo-1563920443079-783e5c786b83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080$q$,
  $q$The gap between physical and cyber security is closing. LEXSO correlates access events, network anomalies, and behavioral signals into a unified threat picture.$q$,
  $q$A tailgating event at 2:47 AM correlated with an anomalous VPN login at the same timestamp is a different threat tier than either signal alone. LEXSO's fusion engine treats physical and cyber telemetry as co-equal inputs to a single risk score.

Most organizations manage physical and cyber security in separate teams with separate tools and separate escalation paths. This separation is a structural gap. An adversary who understands it can use the seam between systems to move through an environment in ways that neither system alone would flag as high-priority.

LEXSO closes that gap by treating every signal, physical or digital, as an input to a single shared model. The system does not require the physical and cyber teams to merge. It requires the data to. When a building access event, a network authentication event, and a behavioral camera detection arrive within a short window with overlapping context, LEXSO correlates them and surfaces the resulting risk score to a single interface.$q$,
  $q$Mar 2025$q$,
  $q$9 min$q$,
  array[$q$Physical-Cyber Fusion$q$, $q$LEXSO$q$, $q$Threat Intelligence$q$],
  true
),
(
  $q$synthetic-training-data$q$,
  $q$Synthetic Training Data for Classified Environments$q$,
  $q$CyberIQ$q$,
  $q$#F97316$q$,
  $q$https://images.unsplash.com/photo-1677442135703-1787eea5ce01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080$q$,
  $q$When real incident data can't leave a classified network, synthetic generation fills the gap without touching live operational data.$q$,
  $q$DeepSense's approach uses differential privacy guarantees and adversarial validation to ensure synthetic sets don't inadvertently encode real-world signatures. Suitable for air-gapped environments.

The training data problem for classified AI is straightforward to describe and difficult to solve. Real incident data is the most valuable input for training a model that will perform in the real environment. But in classified or sensitive networks, that data cannot leave the facility, cannot be processed on external infrastructure, and often cannot be shared even within the organization across classification boundaries.

Synthetic generation under differential privacy guarantees addresses this by producing training sets that statistically resemble real data without encoding any specific real event. Adversarial validation then tests whether the synthetic set can be used to re-identify any real-world signature. Sets that fail this test are discarded. What remains is a training corpus that can be used freely within the network, without any of the handling risk that real data would carry.$q$,
  $q$Feb 2025$q$,
  $q$7 min$q$,
  array[$q$Classified$q$, $q$CyberIQ$q$],
  true
);
