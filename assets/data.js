/* =====================================================================
   HwSec site data — edit this file to update the website.
   Every text that appears in two languages is written as {en:"…", vi:"…"}.
   Anything that starts with "TODO" is shown highlighted in yellow on the
   site until you replace it. Search this file for TODO to find them all.
   ===================================================================== */

const SITE = {
  name:    {en: "Embedded System and Hardware Security Group", vi: "Nhóm nghiên cứu Hệ thống nhúng và An toàn phần cứng"},
  short:   "HwSec",
  host:    {en: "Academy of Cryptography Techniques, Hanoi, Vietnam", vi: "Học viện Kỹ thuật Mật mã, Hà Nội, Việt Nam"},
  email:   "TODO: group email, e.g. hwsec@actvn.edu.vn",
  address: {en: "TODO: room / building, Academy of Cryptography Techniques, Hanoi", vi: "TODO: phòng / tòa nhà, Học viện Kỹ thuật Mật mã, Hà Nội"},
  mapUrl:  "TODO: Google Maps link to the lab",
  github:  "https://github.com/ACT-HwSec",
  crest:   "assets/act-crest.png",   // save the Academy logo here (PNG with transparent background); hidden if missing
  updated: "2026-10-31",
};

/* ---------- People ---------- */
// photo: put a square JPG in assets/people/ and write its file name here, e.g. "ba-anh-dao.jpg".
const PEOPLE = [
  {
    id: "ba-anh-dao", group: "pi", aliases: ["BA Dao", "DB Anh", "DAO BA-ANH"],
    name: "Ba-Anh Dao", nameVi: "Đào Bá Anh",
    role: {en: "Group Leader", vi: "Trưởng nhóm"},
    title: {en: "TODO: academic title and unit (e.g. Lecturer, Faculty of …)", vi: "TODO: học hàm, học vị và đơn vị công tác"},
    photo: "",
    bio: {
      en: "Ba-Anh Dao founded and leads HwSec. His research covers power and microarchitectural side-channel attacks, countermeasures for cryptographic RISC-V systems-on-chip, and compact hardware accelerators for block ciphers. He works closely with Prof. Cong-Kha Pham's group at The University of Electro-Communications (UEC), Tokyo.",
      vi: "Đào Bá Anh là người thành lập và trưởng nhóm HwSec. Hướng nghiên cứu chính gồm tấn công kênh kề qua công suất và vi kiến trúc, các biện pháp chống tấn công cho hệ thống trên chip (SoC) RISC-V mật mã, và các bộ tăng tốc phần cứng nhỏ gọn cho mã khối. Anh hợp tác chặt chẽ với nhóm của GS. Cong-Kha Pham tại trường The University of Electro-Communications (UEC), Tokyo, Nhật Bản."
    },
    education: [
      {en: "TODO: Ph.D. — university, year", vi: "TODO: Tiến sĩ — cơ sở đào tạo, năm"},
      {en: "TODO: M.Sc. — university, year", vi: "TODO: Thạc sĩ — cơ sở đào tạo, năm"},
      {en: "TODO: B.Eng. — university, year", vi: "TODO: Kỹ sư — cơ sở đào tạo, năm"},
    ],
    links: [
      ["Google Scholar", "https://scholar.google.com/citations?user=E6znTccAAAAJ&hl=en"],
      ["Email", "TODO: your email"],
    ],
    metrics: {citations: 208, h: 8, i10: 8, since2021: [207, 8, 8], perYear: {2020:1, 2021:11, 2022:12, 2023:31, 2024:35, 2025:62, 2026:56}},
  },
  {
    id: "ngoc-quynh-nguyen", group: "member", aliases: ["NQ Nguyen", "Ngoc-Quynh Nguyen"],
    name: "Ngoc-Quynh Nguyen", nameVi: "Nguyễn Ngọc Quỳnh", // check the Vietnamese spelling honor: {en: "Mr.", vi: ""},
    role: {en: "TODO: role (e.g. Researcher / PhD student / Lecturer)", vi: "TODO: vai trò trong nhóm"},
    title: {en: "Academy of Cryptography Techniques", vi: "Học viện Kỹ thuật Mật mã"},
    photo: "",
    bio: {
      en: "Works on hardware implementations of block ciphers, including Kuznyechik and GOST 28147-89 accelerators on FPGA and for RISC-V systems-on-chip.",
      vi: "Nghiên cứu triển khai phần cứng cho mã khối, gồm các bộ tăng tốc Kuznyechik và GOST 28147-89 trên FPGA và trong hệ thống trên chip RISC-V."
    },
    links: [["IEEE Xplore", "https://ieeexplore.ieee.org/author/37090074337"]],
  },
  {
    id: "thanh-ngoc-nguyen", group: "member", aliases: ["TN Nguyen", "Thanh-Ngoc Nguyen"],
    name: "Thanh-Ngoc Nguyen", nameVi: "Nguyễn Thanh Ngọc", // check the Vietnamese spelling honor: {en: "Ms.", vi: ""},
    role: {en: "Lecturer · Ph.D. student", vi: "Giảng viên · Nghiên cứu sinh"},
    title: {en: "Faculty of Electronics and Microelectronics, Academy of Cryptography Techniques", vi: "TODO: tên khoa bằng tiếng Việt, Học viện Kỹ thuật Mật mã"},
    photo: "",
    bio: {
      en: "Lecturer at the Academy of Cryptography Techniques since 2013 and a Ph.D. student in cryptographic engineering since 2026. B.Sc. in electronics and telecommunications (Shanghai University, 2012) and M.S. in telecommunications (PTIT, 2015). Interests: cryptography, true random number generators, digital signatures, embedded system design and hardware security.",
      vi: "Giảng viên Học viện Kỹ thuật Mật mã từ năm 2013, nghiên cứu sinh chuyên ngành kỹ thuật mật mã từ năm 2026. Cử nhân Điện tử – Viễn thông (Đại học Thượng Hải, 2012), Thạc sĩ Kỹ thuật Viễn thông (Học viện Công nghệ Bưu chính Viễn thông, 2015). Quan tâm: mật mã, bộ tạo số ngẫu nhiên thực (TRNG), chữ ký số, thiết kế hệ thống nhúng và an toàn phần cứng."
    },
    links: [["IEEE Xplore", "https://ieeexplore.ieee.org/author/339864597276451"]],
  },
  // Add students like this (group: "student" or "alumni"):
  // { id:"…", group:"student", aliases:["AB Nguyen"], name:"…", nameVi:"…", role:{en:"Master's student", vi:"Học viên cao học"}, title:{en:"Topic: …", vi:"Đề tài: …"}, photo:"", bio:{en:"", vi:""}, links:[] },
];

const COLLABORATORS = [
  ["Prof. Cong-Kha Pham", {en: "The University of Electro-Communications, Japan", vi: "The University of Electro-Communications, Nhật Bản"}],
  ["Dr. Trong-Thuc Hoang", {en: "The University of Electro-Communications, Japan", vi: "The University of Electro-Communications, Nhật Bản"}],
  ["Prof. Kuniyasu Suzaki", {en: "Institute of Information Security (IISEC), Japan", vi: "Institute of Information Security (IISEC), Nhật Bản"}],
  ["Assoc. Prof. Van-Phuc Hoang", {en: "Le Quy Don Technical University, Vietnam", vi: "Đại học Kỹ thuật Lê Quý Đôn"}],
  ["Prof. Minh Hieu Nguyen", {en: "Academy of Cryptography Techniques, Vietnam", vi: "Học viện Kỹ thuật Mật mã"}],
  ["Dr. Duc-Hung Le", {en: "University of Science, VNU-HCM, Vietnam", vi: "Trường ĐH Khoa học Tự nhiên, ĐHQG TP.HCM"}],
];

/* ---------- Research areas ---------- */
const AREAS = [
  {k: "sca",
   h: {en: "Side-channel attacks and countermeasures", vi: "Tấn công kênh kề và biện pháp chống"},
   p: {en: "How cryptographic chips leak keys through power consumption, and how to stop it: correlation power analysis, leakage models, and hiding countermeasures such as random dynamic frequency scaling, back-gate biasing and spread-spectrum clocking.",
       vi: "Chip mật mã làm lộ khóa qua công suất tiêu thụ như thế nào và cách ngăn chặn: phân tích tương quan công suất (CPA), mô hình rò rỉ, và các biện pháp che giấu như thay đổi tần số động ngẫu nhiên, phân cực cực cổng sau (back-gate) và xung nhịp trải phổ."}},
  {k: "riscv",
   h: {en: "Secure RISC-V microarchitecture", vi: "An toàn vi kiến trúc RISC-V"},
   p: {en: "Cache side channels and Spectre-style attacks on out-of-order RISC-V processors, including attacks across trusted execution environments, and hardware detectors that catch them at run time.",
       vi: "Kênh kề qua bộ nhớ đệm và tấn công kiểu Spectre trên bộ xử lý RISC-V thực thi không theo thứ tự, kể cả tấn công vượt qua môi trường thực thi tin cậy (TEE), cùng các bộ phát hiện tấn công bằng phần cứng theo thời gian thực."}},
  {k: "accel",
   h: {en: "Cryptographic hardware accelerators", vi: "Bộ tăng tốc phần cứng mật mã"},
   p: {en: "Compact, high-throughput FPGA and ASIC implementations of block ciphers such as GOST 28147-89, Kuznyechik and TWINE, integrated as accelerators in RISC-V systems-on-chip.",
       vi: "Triển khai FPGA và ASIC nhỏ gọn, thông lượng cao cho các mã khối như GOST 28147-89, Kuznyechik và TWINE, tích hợp làm bộ tăng tốc trong hệ thống trên chip RISC-V."}},
  {k: "sbox",
   h: {en: "Lightweight cryptography and S-box design", vi: "Mật mã hạng nhẹ và thiết kế S-box"},
   p: {en: "Designing hardware-efficient and dynamic S-boxes, including constructions from chaotic maps, with strong cryptographic criteria and resistance to side-channel attacks.",
       vi: "Thiết kế S-box hiệu quả về phần cứng và S-box động, bao gồm các cấu trúc dựa trên ánh xạ hỗn loạn, đáp ứng tiêu chí mật mã mạnh và kháng tấn công kênh kề."}},
  {k: "emb", people: ["thanh-ngoc-nguyen"],  // optional: list person ids to override who is shown
   h: {en: "Secure embedded systems", vi: "Hệ thống nhúng an toàn"},
   p: {en: "Building blocks for trustworthy embedded and IoT devices: true random number generators, digital signatures and secure system design.",
       vi: "Các khối xây dựng cho thiết bị nhúng và IoT tin cậy: bộ tạo số ngẫu nhiên thực (TRNG), chữ ký số và thiết kế hệ thống an toàn."}},
];

/* ---------- Projects (funded research and open resources) ---------- */
const PROJECTS = [
  {t: {en: "TODO: project title", vi: "TODO: tên đề tài"}, funder: "TODO: funder (e.g. NAFOSTED, ministry-level)", period: "TODO: 2026–2028", role: {en: "TODO: Principal investigator / member", vi: "TODO: Chủ nhiệm / thành viên"}},
];
const RESOURCES = [
  // {t:{en:"Kuznyechik accelerator RTL", vi:"Mã RTL bộ tăng tốc Kuznyechik"}, url:"https://github.com/ACT-HwSec/…"},
];

/* ---------- News (newest first) ---------- */
const NEWS = [
  {d: "TODO: launch date", t: {en: "The HwSec group website is online.", vi: "Website của nhóm HwSec chính thức hoạt động."}},
  {d: "2026", t: {en: "Paper in IEEE Access: “Hardware-Efficient 5 × 5 S-Boxes With Strong Cryptographic Criteria for Lightweight Cryptography”.", vi: "Bài báo trên IEEE Access: “Hardware-Efficient 5 × 5 S-Boxes With Strong Cryptographic Criteria for Lightweight Cryptography”."}},
  {d: "2026", t: {en: "Thanh-Ngoc Nguyen starts her Ph.D. in cryptographic engineering.", vi: "Nguyễn Thanh Ngọc bắt đầu chương trình nghiên cứu sinh chuyên ngành kỹ thuật mật mã."}},
  {d: "2025", t: {en: "Two papers at VCRIS 2025: an area-efficient Kuznyechik FPGA design and an RTL implementation of the TWINE-80 lightweight cipher.", vi: "Hai bài báo tại hội nghị VCRIS 2025: thiết kế FPGA tiết kiệm tài nguyên cho Kuznyechik và triển khai RTL cho mã hạng nhẹ TWINE-80."}},
  {d: "2025", t: {en: "Paper in IEEE Access: “Dynamic S-Boxes Block Cipher for Side-Channel Attack Resistance”.", vi: "Bài báo trên IEEE Access: “Dynamic S-Boxes Block Cipher for Side-Channel Attack Resistance”."}},
];

/* ---------- Open positions ---------- */
const POSITIONS = [
  {en: "TODO: Ph.D. students — topic(s), funding, start date", vi: "TODO: Nghiên cứu sinh — hướng đề tài, học bổng, thời gian bắt đầu"},
  {en: "TODO: Master's students", vi: "TODO: Học viên cao học"},
  {en: "Undergraduate students for research projects and graduation theses", vi: "Sinh viên tham gia nghiên cứu khoa học và làm đồ án tốt nghiệp"},
];

/* ---------- Publications ----------
   k: journal | conf | thesis     th: sca | riscv | accel | sbox | emb | other
   Group members' names are highlighted automatically (from PEOPLE aliases). */
// Members' names are taken from the "aliases" field of each person in PEOPLE.
const PUBS = [
  {t:"Hardware-Efficient 5 × 5 S-Boxes With Strong Cryptographic Criteria for Lightweight Cryptography", a:"Quang-Huy Tran, Thi-Bac Do, Thu-May Duong, Khanh-Linh Dinh, Hieu-Minh Nguyen, Thanh-Ngoc Nguyen, Phuc-Phan Duong", v:"IEEE Access 14", y:2026, c:0, k:"journal", th:"sbox"},
  {t:"Dynamic S-Boxes Block Cipher for Side-Channel Attack Resistance", a:"PP Duong, HM Nguyen, BA Dao, TH Nguyen, CK Pham", v:"IEEE Access 13, 198523–198539", y:2025, c:1, k:"journal", th:"sbox"},
  {t:"FPGA Implementation of Kuznyechik Block Cipher with Improved Resource Efficiency", a:"BA Dao, DH Le, NQ Nguyen", v:"2nd International Conference on Cryptography and Information Security (VCRIS)", y:2025, c:0, k:"conf", th:"accel"},
  {t:"RTL Design and Implementation of the TWINE-80 Lightweight Block Cipher", a:"Linh Nguyen Thi Thuy, Thanh-Ngoc Nguyen, Bui Duc Trinh, Duc-Tho Mai", v:"2nd International Conference on Cryptography and Information Security (VCRIS)", y:2025, c:0, k:"conf", th:"accel"},
  {t:"Construction of Robust Lightweight S-Boxes Using Enhanced Logistic and Enhanced Sine Maps", a:"PP Duong, HM Nguyen, BA Dao, B Kieu-Do-Nguyen, TH Tran, TT Hoang, et al.", v:"IEEE Access 12, 63976–63994", y:2024, c:17, k:"journal", th:"sbox"},
  {t:"Spread Spectrum-Based Countermeasures for Cryptographic RISC-V SoC", a:"TH Tran, BA Dao, DH Le, VP Hoang, TT Hoang, CK Pham", v:"IEEE Transactions on Very Large Scale Integration (VLSI) Systems 32(12)", y:2024, c:8, k:"journal", th:"sca"},
  {t:"S-Boxes with Optimal Strict Avalanche Criterion Using Chaotic Map", a:"PP Duong, HM Nguyen, BA Dao, TH Tran, B Kieu-Do-Nguyen, CK Pham, et al.", v:"9th International Conference on Integrated Circuits, Design, and Verification (ICDV)", y:2024, c:7, k:"conf", th:"sbox"},
  {t:"A “Kuznyechik” Block Cipher Accelerator for RISC-V System-on-Chip", a:"BA Dao, NQ Nguyen, CT Nguyen", v:"1st International Conference on Cryptography and Information Security (VCRIS)", y:2024, c:1, k:"conf", th:"accel"},
  {t:"Resource-Efficient 4×4 S-Boxes Using Chaotic Map", a:"PP Duong, BA Dao, TH Tran, TH Nguyen, TT Hoang, CK Pham", v:"1st International Conference on Cryptography and Information Security (VCRIS)", y:2024, c:0, k:"conf", th:"sbox"},
  {t:"A Cross-Process Spectre Attack via Cache on RISC-V Processor with Trusted Execution Environment", a:"AT Le, TT Hoang, BA Dao, A Tsukamoto, K Suzaki, CK Pham", v:"Computers and Electrical Engineering 105, 108546", y:2023, c:24, k:"journal", th:"riscv"},
  {t:"Transition Factors of Power Consumption Models for CPA Attacks on Cryptographic RISC-V SoC", a:"TH Tran, BA Dao, TT Hoang, VP Hoang, CK Pham", v:"IEEE Transactions on Computers 72(9), 2689–2700", y:2023, c:16, k:"journal", th:"sca"},
  {t:"Compacting Side-Channel Measurements with Amplitude Peak Location Algorithm", a:"TH Tran, DT Dam, BA Dao, VP Hoang, CK Pham, TT Hoang", v:"IEEE Transactions on Very Large Scale Integration (VLSI) Systems 32(3), 573–586", y:2023, c:8, k:"journal", th:"sca"},
  {t:"A High-Throughput and Compact GOST-28147-89 Accelerator for RISC-V System-on-Chip", a:"BA Dao, NQ Nguyen, CT Nguyen", v:"15th International Conference on Knowledge and Systems Engineering (KSE)", y:2023, c:0, k:"conf", th:"accel"},
  {t:"Spectre Attack Detection with Neural Network on RISC-V Processor", a:"AT Le, TT Hoang, BA Dao, A Tsukamoto, K Suzaki, CK Pham", v:"IEEE International Symposium on Circuits and Systems (ISCAS), 2467–2471", y:2022, c:13, k:"conf", th:"riscv"},
  {t:"Research on Hardware-Based Hiding Countermeasures Against Power Analysis Attacks", a:"DAO BA-ANH", v:"Doctoral thesis", y:2022, c:1, k:"thesis", th:"sca"},
  {t:"RISC-V Computer System Designed for Cyber-Security", a:"TT Hoang, BA Dao, AT Le, VP Hoang, CK Pham", v:"", y:2022, c:0, k:"conf", th:"riscv"},
  {t:"A Real-Time Cache Side-Channel Attack Detection System on RISC-V Out-of-Order Processor", a:"AT Le, TT Hoang, BA Dao, A Tsukamoto, K Suzaki, CK Pham", v:"IEEE Access 9, 164597–164612", y:2021, c:31, k:"journal", th:"riscv"},
  {t:"Correlation Power Analysis Attack Resisted Cryptographic RISC-V SoC With Random Dynamic Frequency Scaling Countermeasure", a:"BA Dao, TT Hoang, AT Le, A Tsukamoto, K Suzaki, CK Pham", v:"IEEE Access 9, 151993–152014", y:2021, c:31, k:"journal", th:"sca"},
  {t:"Exploiting the Back-Gate Biasing Technique as a Countermeasure Against Power Analysis Attacks", a:"BA Dao, TT Hoang, AT Le, A Tsukamoto, K Suzaki, CK Pham", v:"IEEE Access 9, 24768–24786", y:2021, c:24, k:"journal", th:"sca"},
  {t:"Implementation of XTS-GOST 28147-89 with Pipeline Structure on FPGA", a:"BN Tran, NQ Nguyen, BA Dao, CT Nguyen", v:"Modelling, Computation and Optimization in Information Systems and Management Sciences", y:2021, c:1, k:"conf", th:"accel"},
  {t:"Experiment on Replication of Side Channel Attack via Cache of RISC-V Berkeley Out-of-Order Machine (BOOM) Implemented on FPGA", a:"AT Le, BA Dao, K Suzaki, CK Pham", v:"Fourth Workshop on Computer Architecture Research with RISC-V (CARRV)", y:2020, c:22, k:"conf", th:"riscv"},
  {t:"Dynamic Frequency Scaling as a Countermeasure Against Simple Power Analysis Attack in RISC-V Processors", a:"BA Dao, AT Le, TT Hoang, A Tsukamoto, K Suzaki, CK Pham", v:"First International Workshop on Secure RISC-V Architecture Design", y:2020, c:1, k:"conf", th:"sca"},
  {t:"Novel Hardware-Oriented Integer Motion Estimation Algorithms for High Efficiency Video Coding", a:"NV Thang, VD Tung, ND Hoan, DB Anh", v:"6th NAFOSTED Conference on Information and Computer Science (NICS), 160–165", y:2019, c:2, k:"conf", th:"other"},
  {t:"A High Speed, Low Power 6-bit Flash ADC Design", a:"BA Dao, VT Nguyen", v:"7th AUN/SEED-Net International Conference on Electrical and Electronic Engineering", y:2014, c:0, k:"conf", th:"other"},
];
