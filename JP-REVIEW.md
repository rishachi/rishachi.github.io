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
