# CHECKPOINT

Unit: T016 lockfile artifact verification and Expo asset integration — IN PROGRESS.

Starting baseline (2026-11-15): branch head 584129cddfd90f88b9955f708f206a20126b468d. CI #86 succeeded on 34ab4b5. CI #87 for lockfile artifact upload was still running at last checkpoint. Root lockfile absent; no synthetic .db asset is committed; provider hash remains unverified. No native iOS/Android evidence.

This pass will: verify CI #87 and retrieve its generated lockfile artifact if available; review the exact generated lock before committing; inspect provider/Metro/root route wiring and continue the T016 integration in bounded units. Never fabricate lockfile bytes or database hash. Keep changes within NEXT_TASK allowlist and <=350 changed lines per unit.
