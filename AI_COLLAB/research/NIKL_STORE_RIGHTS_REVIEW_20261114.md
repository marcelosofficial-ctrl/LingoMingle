# NIKL Store Distribution and CC BY-SA 2.0 KR Review (2026-11-14)

Status: **Store distribution HOLD.** This is a platform-terms review, not legal advice. No NIKL content or database has been distributed.

## 1. Verified licence wording

CC BY-SA 2.0 KR:
- Grants reproduction, database creation/use, distribution and transmission rights.
- Defines a collection/database as not itself a derivative work for the licence's definition. Included works remain subject to their own licence.
- Requires a copy or URI of the licence, attribution and identification of changes where relevant.
- Prohibits adding conditions that restrict recipients' licence rights and prohibits technological protection measures that restrict exercise of those rights.
- Requires derivatives to use the same or a compatible BY-SA licence.

Source: [CC BY-SA 2.0 KR legal code](https://creativecommons.org/licenses/by-sa/2.0/kr/legalcode). The NIKL site policy says unmarked text materials use CC BY-SA 2.0 KR; multimedia may have individual terms and remains excluded. Exact source/export history is in [NIKL_FULL_EXPORT_AND_RIGHTS_20261113.md](NIKL_FULL_EXPORT_AND_RIGHTS_20261113.md).

## 2. Apple App Store

**Verified wording:**
- Apple's Developer Program Agreement defines FairPlay as the content-protection system applied to App Store-distributed Licensed Applications.
- The Agreement requires licensing terms governing an app and third-party code/FOSS included in it to be consistent with and not conflict with Apple's digital-signing/content-protection aspects.
- Apple's Standard EULA applies to content, materials and services accessible from or purchased within an app. It restricts redistribution/sublicensing and copying/modifying/creating derivative works of the app or parts, with a specific exception for licensing terms governing open-source components included with the app.
- A developer can provide a Custom EULA, but it must satisfy Apple's minimum terms and cannot conflict with Apple Media Services usage rules.

Sources: [Apple Developer Program License Agreement](https://developer.apple.com/support/terms/apple-developer-program-license-agreement/), [Apple Standard EULA](https://www.apple.com/legal/internet-services/itunes/dev/stdeula/).

**Interpretation / unresolved:** a bundled NIKL database inside a FairPlay-protected app, or data accessed from within the app under the Standard EULA, raises a material question about users' ability to extract, copy, modify and redistribute CC-licensed material. The published wording does not conclusively determine how the NIKL data licence interacts with FairPlay, the Standard EULA, a Custom EULA or app sandboxing. Do not assume that a separate file inside the app avoids the issue.

## 3. Google Play

**Verified wording:** Google Play DDA §5.1 authorizes Google, on a non-exclusive, worldwide, royalty-free basis, to reproduce, perform, display, analyse and use the Product for Play operation/marketing, hosting/user access and platform improvement. §5.3 grants users a non-exclusive, worldwide, perpetual licence to use the Product. A separate EULA may be supplied, but the DDA supersedes an EULA where they conflict.

Source: [Google Play Developer Distribution Agreement](https://play.google/intl/en-us/developer-distribution-agreement.html).

**Interpretation / unresolved:** the extent of Google's and users' rights in a bundled CC BY-SA dataset, and whether platform/product terms add restrictions beyond the data licence, requires legal interpretation. The DDA text alone does not settle compatibility.

## 4. Packaging options

| Option | Technical view | Rights status |
|---|---|---|
| Database embedded in app bundle | Easiest offline install | **HOLD:** FairPlay and EULA interaction needs counsel. |
| Separate unencrypted CC BY-SA pack, independently downloadable/exportable and imported by app | Best technical separation; pack can carry its own licence, attribution and manifest | **HOLD:** counsel must confirm in-app access/EULA and platform terms do not restrict CC rights. |
| User-supplied archive/pack processed locally | Avoids developer distributing the source pack | **HOLD:** user possession does not settle transformed-output rights or app behaviour; 1 GB input is poor mobile UX. |
| Web/PWA or non-store distribution | May avoid App Store FairPlay and store EULA constraints | Not automatic clearance; attribution/share-alike, local law, hosting and distribution terms still apply. |

## 5. Questions for qualified counsel

1. Does NIKL CC BY-SA 2.0 KR cover this selected word-only database, and which transformations create a derivative work versus a separate database/collection?
2. What attribution, licence URI, change notice and share-alike text must appear in-app, in the pack, in store metadata and in exports?
3. Does FairPlay, Apple's Standard EULA treatment of in-app content, or a proposed Custom EULA restrict a user's CC rights to extract, copy, modify or redistribute dictionary data?
4. Can a separate unencrypted pack remain independently licensed when downloaded/imported by an App Store app? Does Apple's Developer Program Agreement require additional clearance?
5. Do Google Play DDA §§5.1 and 5.3 grant Google/user rights that conflict with or can coexist with the NIKL licence? What carve-out must the app EULA contain?
6. Must the pack itself be offered under CC BY-SA 2.0 KR, and can app code/UI/schema/user content remain under separate licences without restricting NIKL material?
7. Are any entries, definitions, metadata or source records separately marked or third-party-owned despite the site-wide default policy?

## 6. Decision

- **VERIFIED:** the licence permits database creation and distribution subject to its conditions; Apple uses FairPlay for App Store apps and requires licence-term compatibility; Google Play DDA grants Google broad product-use rights and supersedes conflicting EULAs.
- **INFERRED:** an independently accessible, unencrypted, separately licensed pack may be easier to reconcile than an embedded database, but this is not a legal clearance.
- **UNKNOWN:** exact legal treatment of the selected database, FairPlay/EULA interaction, Google DDA interaction, and required app/data-pack licensing.
- **NO-GO:** store distribution of a NIKL-derived database before qualified counsel review. Keep production import and app bundling on hold.
