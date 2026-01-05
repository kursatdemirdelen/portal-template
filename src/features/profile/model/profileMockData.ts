// Profile Mock Data

export const mockProfileData = {
  // Kullanıcı Özet Bilgileri
  summary: {
    name: "Ahmet Yılmaz",
    title: "Kıdemli Yazılım Mühendisi",
    avatar: "https://i.pravatar.cc/150?img=12",
    initials: "AY",
    role: "worker" as const,
    department: "Bilgi Teknolojileri",
    location: "İstanbul, Türkiye",
    timezone: "GMT+3",
  },

  // Profil Detayları
  detail: {
    fullName: "Ahmet Yılmaz",
    preferredName: "Ahmet",
    birthDate: "15.03.1990",
    birthPlace: "Ankara",
    identityNumber: "12345678901",
    age: "34 Yıl 9 Ay",
    maritalStatus: "Evli",
    nationality: "T.C.",
    gender: "male" as const,
    disabilityLevel: "Yok",
    bloodType: "A Rh(+)",
    militaryStatus: "Tamamlandı",
    bankName: "Garanti BBVA",
    bankAccountNo: "9876543210",
    ibanNo: "TR330006200011900009876543",
  },

  // İş Bilgileri
  workInfo: {
    id: "5",
    otherId: "AR1",
    occupationCode: "2356.02 Bilgi Teknoloji Danışmanı",
    startDate: "09.03.2023",
    tenure: "2 Yıl 10 Ay",
    hiringSource: "Doğrudan",
    endDate: undefined,
    terminationReason: undefined,
    employmentStatus: "Tam Zamanlı",
    salaryType: "Net",
    location: "Merkez",
    department: "Ar&Ge",
    serviceArea: "Web Front End Development",
    jobTitle: "Developer",
    level: "5",
    manager: "Turgut Özçelikyürek",
    workExperience: [
      {
        company: "Intellium Bilişim Teknolojileri A.Ş.",
        task: "Software Developer",
        jobTitle: "Developer",
        startDate: "09.03.2023",
        endDate: "Devam Ediyor",
      },
      {
        company: "TechVision Yazılım Ltd. Şti.",
        task: "Frontend Developer",
        jobTitle: "Junior Developer",
        startDate: "15.06.2021",
        endDate: "28.02.2023",
      },
      {
        company: "Digital Solutions A.Ş.",
        task: "Web Developer",
        jobTitle: "Intern",
        startDate: "01.09.2020",
        endDate: "31.05.2021",
      },
      {
        company: "Freelance",
        task: "Full Stack Developer",
        jobTitle: "Freelancer",
        startDate: "01.01.2020",
        endDate: "31.08.2020",
      },
    ],
  },

  // İletişim Bilgileri
  contactInfo: {
    phone: "+90 212 555 0001",
    mobile: "+90 532 555 0002",
    email: "ahmet.yilmaz@techsolutions.com",
    personalEmail: "ahmet.yilmaz@gmail.com",
    addresses: [
      {
        type: "Ev",
        address: "Atatürk Mah. Cumhuriyet Cad. No: 123 D: 5",
        city: "İstanbul",
        district: "Kadıköy",
        postalCode: "34710",
      },
      {
        type: "İş",
        address: "Levent Mah. Büyükdere Cad. No: 456 Kat: 12",
        city: "İstanbul",
        district: "Beşiktaş",
        postalCode: "34330",
      },
    ],
    emergencyContacts: [
      {
        name: "Ayşe Yılmaz",
        relation: "Eş",
        phone: "+90 533 555 0003",
      },
      {
        name: "Ali Yılmaz",
        relation: "Baba",
        phone: "+90 534 555 0004",
      },
    ],
  },

  // Eğitim Bilgileri
  educationInfo: {
    educations: [
      {
        level: "Yüksek Lisans",
        school: "İstanbul Teknik Üniversitesi",
        department: "Bilgisayar Mühendisliği",
        scholarshipType: "Tam Burs",
        grade: "3.65",
        startDate: "09.2015",
        graduationDate: "06.2017",
      },
      {
        level: "Lisans",
        school: "Orta Doğu Teknik Üniversitesi",
        department: "Bilgisayar Mühendisliği",
        scholarshipType: "Kısmi Burs (%50)",
        grade: "3.42",
        startDate: "09.2010",
        graduationDate: "06.2015",
      },
      {
        level: "Lise",
        school: "Ankara Fen Lisesi",
        department: undefined,
        scholarshipType: undefined,
        grade: "92.5",
        startDate: "09.2006",
        graduationDate: "06.2010",
      },
    ],
  },

  // Dil Bilgileri
  languageInfo: {
    languages: [
      {
        name: "Türkçe",
        level: "Ana Dil" as const,
        reading: 100,
        writing: 100,
        speaking: 100,
        certificate: "Ana Dil - Doğum",
      },
      {
        name: "İngilizce",
        level: "İleri" as const,
        reading: 95,
        writing: 85,
        speaking: 80,
        certificate: "TOEFL iBT - 105/120",
      },
      {
        name: "Almanca",
        level: "Orta" as const,
        reading: 70,
        writing: 55,
        speaking: 50,
        certificate: "Goethe-Zertifikat B1",
      },
      {
        name: "Japonca",
        level: "Başlangıç" as const,
        reading: 30,
        writing: 20,
        speaking: 25,
        certificate: undefined,
      },
    ],
  },

  // Sertifikalar
  certifications: {
    certifications: [
      {
        certificateNo: "AWS-SAP-2023-12345",
        name: "AWS Solutions Architect - Professional",
        issuer: "Amazon Web Services",
        issueDate: "15.03.2023",
        expiryDate: "15.03.2026",
        score: "890/1000",
      },
      {
        certificateNo: "CKA-2023-67890",
        name: "Certified Kubernetes Administrator (CKA)",
        issuer: "Cloud Native Computing Foundation",
        issueDate: "01.06.2023",
        expiryDate: "01.06.2026",
        score: "92/100",
      },
      {
        certificateNo: "PMP-2022-54321",
        name: "PMP - Project Management Professional",
        issuer: "Project Management Institute",
        issueDate: "10.01.2022",
        expiryDate: "10.01.2025",
        credentialId: "PMP-2022-54321",
        credentialUrl: "https://pmi.org/verify",
        status: "Süresi Dolmak Üzere" as const,
        category: "Proje Yönetimi",
      },
      {
        name: "ISO 27001 Lead Auditor",
        issuer: "BSI Group",
        issueDate: "20.05.2021",
        expiryDate: "20.05.2024",
        certificateNo: "ISO27001-LA-2021",
        credentialId: "ISO27001-LA-2021",
        status: "Süresi Doldu" as const,
        category: "Güvenlik",
      },
    ],
    courses: [
      {
        name: "React Advanced Patterns",
        provider: "Udemy",
        completionDate: "15.11.2023",
        duration: "40 saat",
        certificate: true,
      },
      {
        name: "TypeScript Deep Dive",
        provider: "Frontend Masters",
        completionDate: "01.09.2023",
        duration: "25 saat",
        certificate: true,
      },
      {
        name: "System Design Interview",
        provider: "Coursera",
        completionDate: "20.06.2023",
        duration: "60 saat",
        certificate: true,
      },
      {
        name: "Leadership Skills for Tech Managers",
        provider: "LinkedIn Learning",
        completionDate: "10.03.2023",
        duration: "15 saat",
        certificate: false,
      },
    ],
  },

  // Aile Bilgileri
  familyInfo: {
    maritalStatus: "Evli",
    spouseName: "Ayşe Yılmaz",
    spouseOccupation: "Öğretmen",
    numberOfChildren: 2,
    familyMembers: [
      {
        firstName: "Ayşe",
        lastName: "Yılmaz",
        relation: "Eş",
        phone: "+90 533 555 0003",
        birthDate: "22.07.1992",
        identityNo: "12345678901",
      },
      {
        firstName: "Can",
        lastName: "Yılmaz",
        relation: "Çocuk",
        birthDate: "10.05.2018",
        identityNo: "98765432101",
      },
      {
        firstName: "Ela",
        lastName: "Yılmaz",
        relation: "Çocuk",
        birthDate: "15.09.2021",
        identityNo: "87654321098",
      },
      {
        firstName: "Fatma",
        lastName: "Yılmaz",
        relation: "Anne",
        phone: "+90 535 555 0005",
        birthDate: "03.01.1965",
        identityNo: "23456789012",
      },
      {
        firstName: "Ali",
        lastName: "Yılmaz",
        relation: "Baba",
        phone: "+90 534 555 0004",
        birthDate: "18.11.1962",
        identityNo: "34567890123",
      },
    ],
  },
};

// User rolü için sade profil
export const mockSimpleProfileData = {
  summary: {
    name: "Zeynep Demir",
    title: "Müşteri",
    avatar: "",
    initials: "ZD",
    role: "user" as const,
    location: "Ankara, Türkiye",
  },
  contactInfo: {
    phone: "+90 312 555 0010",
    mobile: "+90 536 555 0011",
    email: "zeynep.demir@email.com",
    addresses: [
      {
        type: "Ev",
        address: "Çankaya Mah. Atatürk Bulvarı No: 50 D: 8",
        city: "Ankara",
        district: "Çankaya",
        postalCode: "06680",
      },
    ],
  },
};

// Admin rolü için ek veriler
export const mockAdminProfileData = {
  ...mockProfileData,
  summary: {
    ...mockProfileData.summary,
    name: "Mehmet Kaya",
    title: "Sistem Yöneticisi",
    initials: "MK",
    role: "admin" as const,
    department: "IT Yönetimi",
  },
  workInfo: {
    ...mockProfileData.workInfo,
    position: "IT Direktörü",
    employeeId: "EMP-2015-0001",
    startDate: "01.03.2015",
    manager: "Genel Müdür",
    salary: "₺85.000",
  },
};
