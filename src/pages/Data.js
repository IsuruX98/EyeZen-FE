import Treatment01 from "../assets/ayurvedic/treatment01.jpg";
import Treatment02 from "../assets/ayurvedic/Tharpanam.jpg";
import Treatment03 from "../assets/ayurvedic/treatment2.jpg";
import Doctor from "../assets/ayurvedic/doctor.jpeg";

const treatmentsData = [
  {
    id: 1,
    image: Treatment01,
    title: "Triphala Kashaya",
    description:
      "Use of Triphala Kashaya (decoction of Triphala) or Triphala Churna (Triphala powder) with honey or ghee is beneficial for eyes.",
    type: "Ayurvedic Treatment",
  },
  {
    id: 2,
    image: Treatment02,
    title: "Eye Wash with Triphala Kashaya",
    description:
      "Doing eye wash regularly with Triphala Kashaya (decoction of Triphala) from the beginning will destroy all eye diseases and protect eyes.",
    type: "Ayurvedic Treatment",
  },
  {
    id: 3,
    image: Treatment03,
    title: "Eye Massage with Wet Palm",
    description:
      "Massage of eyes with wet palm immediately after having food will protect vision from harmful effects.",
    type: "Ayurvedic Treatment",
  },
  {
    id: 4,
    image: Treatment01,
    title: "Nasya (Infiltration of Medicines)",
    description:
      "It is good to apply Anjana (Collyrium), use of Nasya (Infiltration of Medicines though Nostrils) daily as a routine regimen to protect eyes and to drain out excess Kapha from the eyes as the eye can be easily afflicted with diseases.",
    type: "Ayurvedic Treatment",
  },
  {
    id: 5,
    image: Treatment01,
    title: "Padabhyanga (Foot Massage)",
    description:
      "One should regularly consume Triphala, Ghee, Barley, Wheat, Shastika shali (old rice), Saidhava Lavana, Draksha, Dadima (pomegranate), use of Shatavari (Asparagus officinalis), Green Gram doing Padabhyanga (oil massage of foot), use of foot ware and application of medicated Lepa (paste) to the Pada (foot) to protect vision.",
    type: "Ayurvedic Treatment",
  },
  {
    id: 6,
    image: Treatment01,
    title: "Preventive Measures",
    description:
      "One should avoid overeating, anger, grief, sleeping in the daytime, or awakening at night and eating food which vitiates vata dosha.",
    type: "Preventive Measures",
  },
  {
    id: 7,
    image: Treatment01,
    title: "Balancing Doshas",
    description:
      "Ayurvedic principles emphasize balancing the doshas (Vata, Pitta, and Kapha) for maintaining good vision and overall eye health.",
    type: "Ayurvedic Principles",
  },
  {
    id: 8,
    image: Treatment01,
    title: "Improving Eyesight Naturally",
    description:
      "Learn techniques like eye exercises and relaxation methods to improve eyesight naturally. Explore the Bates Method, which focuses on relaxation and vision retraining exercises.",
    type: "Natural Eye Improvement",
  },
  {
    id: 9,
    image: Treatment01,
    title: "Enhancing Eye Health",
    description:
      "Discover the importance of a healthy lifestyle, including proper sleep, a balanced diet, and regular exercise, for maintaining good eye health.",
    type: "Lifestyle for Eye Health",
  },
  {
    id: 10,
    image: Treatment01,
    title: "Ayurvedic Eye Care: A Holistic Approach to Better Vision",
    description:
      "In this article, we will explore the ancient wisdom of Ayurveda and how it offers a holistic approach to maintaining and improving eye health. We'll delve into the importance of balancing the doshas, incorporating eye-friendly herbs, and following Ayurvedic practices to protect your eyes from various diseases.",
    type: "Ayurvedic Article",
  },
  {
    id: 11,
    image: Treatment01,
    title: "Triphala: The Miracle Herbal Remedy for Brighter Eyes",
    description:
      "Discover the wonders of Triphala, a herbal combination renowned in Ayurveda for its myriad of health benefits, especially for the eyes. Learn how Triphala can be used as an eye wash, supplement, or in conjunction with ghee to promote clearer vision and prevent eye diseases.",
    type: "Ayurvedic Article",
  },
  {
    id: 12,
    image: Treatment01,
    title: "The Role of Doshas in Eye Health: Balancing Vata, Pitta, and Kapha",
    description:
      "Ayurveda teaches us that imbalances in the doshas can affect eye health. This article will provide insights into how Vata, Pitta, and Kapha doshas influence our vision and what Ayurvedic practices can help harmonize these energies for optimal eye care.",
    type: "Ayurvedic Article",
  },
];

const videoData = [
  {
    id: 1,
    videoUrl:
      "https://res.cloudinary.com/dpgelkpd4/video/upload/v1694188634/Ayurvedaeyes_x50rhd.mp4",
    thumbnailUrl: Treatment03,
    title: "Ayurvedic Eye Care - Part 1",
    description:
      "Learn about Ayurvedic practices for maintaining healthy eyes.",
    type: "Lifestyle for Eye Health",
  },
  {
    id: 2,
    videoUrl:
      "https://res.cloudinary.com/dpgelkpd4/video/upload/v1694188634/Ayurvedaeyes_x50rhd.mp4",
    thumbnailUrl: Treatment02,
    title: "Ayurvedic Eye Care - Part 2",
    description: "Discover Ayurvedic remedies for common eye problems.",
    type: "Ayurvedic Eye Care",
  },
  {
    id: 3,
    videoUrl:
      "https://res.cloudinary.com/dpgelkpd4/video/upload/v1694188634/Ayurvedaeyes_x50rhd.mp4",
    thumbnailUrl: Treatment01,
    title: "Ayurvedic Eye Massage Techniques",
    description:
      "Learn Ayurvedic eye massage techniques for relaxation and vision improvement.",
    type: "Ayurvedic Eye Care",
  },
];

const doctorData = [
  {
    name: "Dr. John Doe",
    email: "john.doe@example.com",
    mobile: "123-456-7890",
    specialization: "Ophthalmologist",
    type: "Ayurvedic",
    town: "Galle",
    latitude: "6.0367",
    longitude: "80.2170",
    about:
      "Dr. Ayurveda Sharma is a highly skilled Ayurvedic Ophthalmologist with over 15 years of experience in holistic eye care. He is dedicated to helping patients maintain and improve their eye health through Ayurvedic practices.",
    qualifications: "MD in Ophthalmology",
    experience: "10+ years",
    servicesOffered: ["Cataract Surgery", "LASIK", "Glaucoma Treatment"],
    officeHours: "Mon-Fri: 9 AM - 5 PM",
    acceptedPaymentMethods: ["Cash", "Credit Card"],
    profilePicUrl: Doctor,
  },
  {
    name: "Dr. Sarah Smith",
    email: "sarah.smith@example.com",
    mobile: "987-654-3210",
    specialization: "Optometrist",
    type: "Optician",
    town: "Colombo",
    latitude: "6.9271",
    longitude: "79.8612",
    about:
      "Dr. Ayurveda Sharma is a highly skilled Ayurvedic Ophthalmologist with over 15 years of experience in holistic eye care. He is dedicated to helping patients maintain and improve their eye health through Ayurvedic practices.",
    qualifications: "OD (Doctor of Optometry)",
    experience: "8+ years",
    servicesOffered: ["Eye Examinations", "Contact Lens Fitting"],
    officeHours: "Mon-Sat: 10 AM - 6 PM",
    acceptedPaymentMethods: ["Cash", "Debit Card", "Insurance"],
    profilePicUrl: Doctor,
  },
  {
    name: "Dr. Lisa Johnson",
    email: "lisa.johnson@example.com",
    mobile: "555-123-4567",
    specialization: "Pediatric Ophthalmologist",
    type: "Retina Specialist",
    town: "Kandy",
    latitude: "7.2906",
    longitude: "80.6337",
    about:
      "Dr. Ayurveda Sharma is a highly skilled Ayurvedic Ophthalmologist with over 15 years of experience in holistic eye care. He is dedicated to helping patients maintain and improve their eye health through Ayurvedic practices.",
    qualifications: "MD in Pediatric Ophthalmology",
    experience: "12+ years",
    servicesOffered: ["Pediatric Eye Exams", "Strabismus Treatment"],
    officeHours: "Tue-Fri: 8:30 AM - 4:30 PM",
    acceptedPaymentMethods: ["Cash", "Credit Card", "Medicaid"],
    profilePicUrl: Doctor,
  },
  {
    name: "Dr. Michael Brown",
    email: "michael.brown@example.com",
    mobile: "111-222-3333",
    specialization: "Retina Specialist",
    type: "Ayurvedic",
    town: "Jaffna",
    latitude: "9.6617",
    longitude: "80.0250",
    about:
      "Dr. Ayurveda Sharma is a highly skilled Ayurvedic Ophthalmologist with over 15 years of experience in holistic eye care. He is dedicated to helping patients maintain and improve their eye health through Ayurvedic practices.",
    qualifications: "MD in Retina Surgery",
    experience: "15+ years",
    servicesOffered: ["Retina Surgery", "Macular Degeneration Treatment"],
    officeHours: "Mon-Wed: 9 AM - 3 PM",
    acceptedPaymentMethods: ["Cash", "Credit Card", "Medicare"],
    profilePicUrl: Doctor,
  },
  {
    name: "Dr. Emily Clark",
    email: "emily.clark@example.com",
    mobile: "333-444-5555",
    specialization: "Cornea Specialist",
    type: "Neuro-Ophthalmologist",
    town: "Trincomalee",
    latitude: "8.5871",
    longitude: "81.2150",
    about:
      "Dr. Ayurveda Sharma is a highly skilled Ayurvedic Ophthalmologist with over 15 years of experience in holistic eye care. He is dedicated to helping patients maintain and improve their eye health through Ayurvedic practices.",
    qualifications: "MD in Cornea Surgery",
    experience: "9+ years",
    servicesOffered: ["Cornea Transplants", "Keratoconus Treatment"],
    officeHours: "Thu-Sat: 10 AM - 5 PM",
    acceptedPaymentMethods: ["Cash", "Debit Card"],
    profilePicUrl: Doctor,
  },
];

export { treatmentsData, videoData, doctorData };
