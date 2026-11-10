# JP-REVIEW — Japanese Localization Verification Log

This document lists all new and updated Japanese strings introduced in the `portfolio-fixes` branch. Each entry includes its localization key, original/updated Japanese text, English translation, and context for review by a native Japanese speaker or anime production director.

---

### 1. `hero.eyebrow`
- **Location**: Hero Section (`#top` eyebrow)
- **Key**: `hero.eyebrow`
- **JP Text**:
  ```text
  2Dアニメーター・原画マン (Key Animator)
  ```
- **EN Meaning**:
  "2D Animator & Key Animator (原画マン)"
- **Context & Intent**:
  Reflects the primary role targeting Japanese commercial anime studios as a Key Animator (原画マン), replacing the generic "2D Animator & Illustrator".

---

### 2. `hero.sub`
- **Location**: Hero Section (`#top` sub-lede paragraph)
- **Key**: `hero.sub`
- **JP Text**:
  ```text
  日本のアニメーション制作における原画（一原・二原）・レイアウト・キャラクター芝居を担当。ベトナムを拠点に東京のスタジオを目指して作画中。
  ```
- **EN Meaning**:
  "Handling key animation (1st/2nd key), layout, and character acting for Japanese anime productions. Based in Vietnam, drawing toward Tokyo studios."
- **Context & Intent**:
  Positions key anime production skills (Ichigen, Nigen, Layout, Character acting) prominently while removing illustration from the hero lead.

---

### 3. `about.p1`
- **Location**: About Section (`#about` lead biography paragraph)
- **Key**: `about.p1`
- **JP Text**:
  ```html
  ホーチミン市のアニメ制作現場において、<strong>レイアウト（LO）・原画（Genga）</strong>から<strong>クリンナップ・動画（Douga）</strong>、そして<strong>デジタルペイント（仕上げ / Shiage）</strong>に至るまで、2Dアニメーションの1カットを通貫して制作できるスキルを備えています。動きの設計から線の清書・彩色まで一貫して担える経験を活かし、立体感（デッサン）の維持と厳密なタイムシート設計に基づいた作画を実践しています。
  ```
- **EN Meaning**:
  "Working in anime production in Ho Chi Minh City, I possess the skills to handle an entire 2D animation cut end-to-end — from layout (LO) and key animation (Genga) through clean-up, in-betweening (Douga), and digital paint (Shiage). Leveraging experience that spans motion design to clean linework and painting, I execute animation grounded in disciplined volume control (dessin) and precise timesheet design."
- **Context & Intent**:
  Replaces previous phrasing regarding bypassing the douga phase. Accurately and neutrally presents comprehensive cut-handling competency across the full 2D pipeline (LO -> Genga -> Douga -> Shiage) using standard anime studio terminology.

---

### 4. `id.creditsVal`
- **Location**: About Section ID Card (`.idcard` Credits item)
- **Key**: `id.creditsVal`
- **JP Text**:
  ```text
  作画スタッフリスト（Tan Phat / ID: 400619） ↗
  ```
- **EN Meaning**:
  "Animation Staff List (Tan Phat / ID: 400619) ↗"
- **Context & Intent**:
  Matches the exact name spelling ("Tan Phat") indexed on the Keyframe Staff List database website for ID 400619.

---

### 5. `work.pixivTag`
- **Location**: Work Section (`.more-card` illustration hub tag)
- **Key**: `work.pixivTag`
- **JP Text**:
  ```text
  Pixiv アーカイブ · 50点以上の作品
  ```
- **EN Meaning**:
  "Pixiv Archive · 50+ Artworks"
- **Context & Intent**:
  Elevates the visibility of Pixiv as the primary repository for character designs and illustrations.

---

### 6. Credits Table Suite (`credits.*`)
- **Location**: About Section (`.credits-box` table)

| Key | Japanese Text | English Meaning | Notes |
| :--- | :--- | :--- | :--- |
| `credits.title` | `参加作品クレジット (Production Credits)` | Production Credits | Header for credits box |
| `credits.thProject` | `作品名` | Project Title | Table column: Project |
| `credits.thRole` | `担当役職` | Assigned Role | Table column: Role |
| `credits.thYear` | `制作年` | Production Year | Table column: Year |
| `credits.thStudio` | `制作スタジオ / チーム` | Studio / Team | Table column: Studio |
| `credits.commercial` | `商業アニメ作品クレジット（TV/劇場版）：秘密保持契約（NDA）に基づき、ご要望に応じて開示いたします。` | Commercial anime credits (TV/Theatrical): Disclosed upon request in compliance with Non-Disclosure Agreements (NDA). | Footer note for unlisted studio titles |

---

### 7. `alt.reelPoster`
- **Location**: Showreel Poster (`.reel__poster img`)
- **Key**: `alt.reelPoster`
- **JP Text**:
  ```text
  ファット・トラン（RiSH）アニメーション作画リール 2024-2026 ポスター
  ```
- **EN Meaning**:
  "Phat Tran (RiSH) Animation Showreel 2024-2026 Poster"
- **Context & Intent**:
  Accessible alt description for the dedicated YouTube showreel video poster.


---

### 8. Awwwards "Sakuga Atelier" Interactive Controls (`atelier.*`, `hero.*`, `reel.cue*`, `process.stack3d`, `work.*`, `douga.tabSplit`)
- **Location**: Header Control Deck, Hero WebGL Stage, Showreel Shot Breakdown, Process 3D Stack, Work Toolbar, and Douga Split Mode

| Key | Japanese Text | English Meaning | Notes |
| :--- | :--- | :--- | :--- |
| `atelier.modeLight` | `作画机（明）` | Animation Desk (Light) | Light-table paper theme toggle label |
| `atelier.modeDark` | `撮影室（暗）` | Photography / Satsuei Room (Dark) | Darkroom theme toggle label |
| `atelier.sfx` | `効果音` | Sound Effects (SFX) | Tactile Web Audio synthesizer toggle |
| `hero.onionGlsl` | `オニオンスキン [GLSL]` | Onion-Skin [GLSL] | Real-time Sobel edge-detection shader toggle |
| `hero.stageLabel` | `透過レイヤー:` | X-Ray / Loupe Layer: | Label for 5-stage hero pipeline bar |
| `reel.cue1` | `スプリント作画・インパクトカット` | Sprint Sakuga & Impact Cuts | Showreel cue 00:04 |
| `reel.cue2` | `キャラクター芝居・感情表現` | Character Acting & Emotional Expression | Showreel cue 00:18 |
| `reel.cue3` | `レイアウト（LO）・カメラワーク` | Layout (LO) & Camera Work | Showreel cue 00:34 |
| `reel.cue4` | `2Dエフェクト・髪/布・撮影処理` | 2D Effects, Hair/Cloth & Satsuei Compositing | Showreel cue 00:49 |
| `process.stack3d` | `3Dレイヤー分解表示` | 3D Exploded Layer View | Isometric 5-layer cel stack toggle |
| `work.filterAll` | `全カット (05)` | All Cuts (05) | Cut-bag filter: all works |
| `work.filterAnim` | `作画・原画・動画 (03)` | Sakuga / Genga / Douga (03) | Cut-bag filter: animation works |
| `work.filterIllust` | `キャラ設定・イラスト (02)` | Character Design & Illustration (02) | Cut-bag filter: illustration works |
| `work.viewEditorial` | `詳細シート表示` | Detailed Cut-Sheet View | Editorial layout view button |
| `work.viewGrid` | `カット袋一覧グリッド` | Cut-Bag Index Grid | Compact 2-column bento grid button |
| `douga.tabSplit` | `50/50 比較` | 50/50 Split Comparison | Side-by-side Final Cut vs Douga Line Art wipe |

---

### 9. Phase 2 — Sakuga 24fps Theatre Player & Interactive Cut Breakdown (`theatre.*`, `cbd.*`)
- **Location**: Section `01 — Showreel` Sakuga 24fps Theatre Player (`[data-sakuga-theatre]`) and Section `03.1 — GET_SET RUN` Interactive Pipeline Breakdown Console (`[data-cut-breakdown]`)

| Key | Japanese Text | English Meaning | Notes |
| :--- | :--- | :--- | :--- |
| `theatre.tabInspector` | `作画24fpsインスペクター (Cut 008)` | Sakuga 24fps Inspector (Cut 008) | Deck selector tab for native 24fps frame-stepping player |
| `theatre.tabYoutube` | `YouTube 作画リール本編 (2024–26)` | Full YouTube Showreel (2024–26) | Deck selector tab for YouTube showreel facade |
| `theatre.loopCut` | `ループ再生` | Loop Playback (Loop Cut) | Toggle button for seamless cut looping |
| `theatre.gridGuide` | `100フレーム枠・安全フレーム` | 100-Frame Field & Safe Frame Guide | Toggle button for 100-Frame Anime Camera Framing Grid SVG overlay |
| `theatre.hintKeys` | `キー操作: [,] 1コマ戻る · [.] 1コマ進む (1/24秒) · [G] カメラ枠ガイド` | Key controls: [,] Step back 1 koma · [.] Step forward 1 koma (1/24s) · [G] Camera frame guide | Instruction hint for animators & directors |
| `cbd.title` | `インタラクティブ工程比較 · カット008 パイプライン` | Interactive Pipeline Breakdown · Cut 008 Pipeline | Header title for interactive cut breakdown console |
| `cbd.s1` | `3D LO・ラフ原画` | 3D Layout & Rough Genga | Stage 01 button label |
| `cbd.s2` | `原画・影付け設計` | Genga & Shadow Design | Stage 02 button label |
| `cbd.s3` | `動画・仕上げ (CSP EX)` | Douga & Digital Paint (CSP EX) | Stage 03 button label |
| `cbd.s4` | `最終撮影 (After Effects)` | Final Satsuei Compositing (After Effects) | Stage 04 button label |
| `cbd.wipeBtn` | `A/B ワイプ比較` | A/B Wipe Compare | Toggle button for interactive wipe slider against Final Satsuei |
| `cbd.fullSheet` | `4工程シート拡大 ↗` | Enlarge 4-Stage Sheet ↗ | Button opening the full 2000px composite breakdown sheet in lightbox |

