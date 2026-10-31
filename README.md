# HwSec — group website

Website of the **Embedded System and Hardware Security Group (HwSec)**, Academy of Cryptography Techniques, Hanoi.
Live at **https://act-hwsec.github.io** once published.

Plain HTML, CSS and JavaScript with no build step. It works in English and Vietnamese (EN | VI switch at the top right).

```
index.html          Home
research.html       Research areas, projects, code and data
people.html         Group leader, members, students, alumni, collaborators
publications.html   All publications, with filters
news.html           News
join.html           Open positions and contact
assets/data.js      ← ALL CONTENT LIVES HERE. Edit this file to update the site.
assets/site.js      Rendering and language switch (normally no need to edit)
assets/style.css    Design
assets/favicon.svg  Tab icon
assets/people/      Put member photos here (square JPG, ~400×400)
```

---

## Set up GitHub Pages for the ACT-HwSec organization

You have already created the organization **ACT-HwSec**. An organization site lives in a repository named after the organization.

### 1. Create the repository
1. Go to https://github.com/organizations/ACT-HwSec/repositories/new
2. **Owner:** ACT-HwSec. **Repository name:** `ACT-HwSec.github.io` (exactly this; GitHub serves it as `act-hwsec.github.io`).
3. Choose **Public**. Leave "Add a README" unticked.
4. Click **Create repository**.

### 2. Upload the files
**Option A — in the browser (simplest)**
1. In the new empty repo, click **uploading an existing file**.
2. Open the folder `F:\DBA_Agents_Team\ACT-HwSec.github.io` in File Explorer, select **everything inside it** (the six `.html` files, `README.md` and the `assets` folder) and drag it into the page.
3. Check that `assets/` appears in the file list, write a message such as "First version of the site" and click **Commit changes**.

**Option B — with Git**
```bash
cd F:/DBA_Agents_Team/ACT-HwSec.github.io
git init -b main
git add .
git commit -m "First version of the site"
git remote add origin https://github.com/ACT-HwSec/ACT-HwSec.github.io.git
git push -u origin main
```

### 3. Turn on Pages
1. In the repo: **Settings → Pages**.
2. **Source:** *Deploy from a branch*. **Branch:** `main`, folder `/ (root)`. Click **Save**.
3. Wait 1–2 minutes. The **Actions** tab shows the deployment; when it is green, open **https://act-hwsec.github.io**.
4. Tick **Enforce HTTPS** if it is offered.

### 4. Add your members (optional but recommended)
**ACT-HwSec → People → Invite member**: invite Ngoc-Quynh Nguyen and Thanh-Ngoc Nguyen by GitHub username or email so they can update the site too.
In the organization **Settings**, add a profile picture (you can upload `assets/favicon.svg` converted to PNG) and the website URL `https://act-hwsec.github.io`.

### 5. Updating the site later
Edit `assets/data.js` (on GitHub: open the file → pencil icon → edit → **Commit changes**). The site updates within a minute or two.
If you hire the Web Dev Employee for this site, give it the address `https://act-hwsec.github.io` and this repository.

---

## Still to fill in (shown in yellow on the site)

Open `assets/data.js` and search for `TODO`. Every one appears highlighted in yellow on the site until you replace it.

| Where in `data.js` | What to put |
|---|---|
| `SITE.email` | Group or contact email |
| `SITE.address` (EN + VI) | Room / building of the lab |
| `SITE.mapUrl` | Google Maps link to the lab |
| PI `title` (EN + VI) | Your academic title and unit |
| PI `education` (3 lines, EN + VI) | Degrees, universities, years |
| PI `links` → Email | Your email |
| Ngoc-Quynh Nguyen `role` | His role in the group |
| Thanh-Ngoc Nguyen `title.vi` | Vietnamese name of the Faculty of Electronics and Microelectronics |
| `PROJECTS` | Funded projects: title, funder, period, role |
| `RESOURCES` | Released code / RTL / datasets on GitHub (optional; remove the section if none) |
| `NEWS` first item | Launch date of the website |
| `POSITIONS` (first two) | Ph.D. and Master's openings: topics, funding, start date |
| Students | Add entries to `PEOPLE` with `group: "student"` |

**Also check:**
- The Vietnamese spellings of the members' names (`nameVi`): *Nguyễn Ngọc Quỳnh* and *Nguyễn Thanh Ngọc* are guesses.
- The 2022 thesis entry is labelled as a doctoral thesis.
- Thanh-Ngoc Nguyen's IEEE Xplore profile also lists two papers outside hardware security (traffic-sign detection, assessment design). They may belong to someone else with the same name, so they are **not** on the site.
- Photos: put `firstname-lastname.jpg` in `assets/people/` and set `photo: "firstname-lastname.jpg"` for that person.
- Update `SITE.updated` and the PI's `metrics` from Google Scholar when you refresh publications.

## Adding a publication

Add one line at the top of `PUBS` in `assets/data.js`:
```js
{t:"Title", a:"A Author, BA Dao, …", v:"Venue, volume, pages", y:2026, c:0, k:"journal", th:"sca"},
```
`k` is `journal`, `conf` or `thesis`. `th` is one of `sca`, `riscv`, `accel`, `sbox`, `emb`, `other`. Add `url:"https://doi.org/…"` to link to the paper instead of Google Scholar. Members' names are made bold automatically using the `aliases` of each person.

## License

Code: MIT (see [`LICENSE`](LICENSE)). Text and images: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) unless noted otherwise.

Published papers remain under their publishers' copyright; only bibliographic details are listed here. Member photos are used with each person's permission and are not covered by CC BY 4.0.
