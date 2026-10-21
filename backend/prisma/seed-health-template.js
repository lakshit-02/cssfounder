/**
 * Put the MediCare template on the admin Templates page
 * under Health & Wellness.
 * Run: npm run db:seed:health-template -w backend
 */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const KEY = 'template-medicare-1';
const CATEGORY_SLUG = 'health-and-wellness';

const template = {
  key: KEY,
  numericId: 17,
  title: 'MediCare',
  type: 'Multiple Pages Website',
  image: '/health%20and%20wellness/images/medicare_01.jpg',
  previewImage: '/health%20and%20wellness/images/medicare_01.jpg',
  previewDescription: 'Clinic and healthcare website.',
  prebuiltPages: 7,
  pages: [
    { id: 'about', label: 'About Us', sectionType: 'AboutPage', sectionOrder: ['PageBanner', 'AboutPage', 'Mission', 'WhyChooseUs'] },
    { id: 'services', label: 'Our Services', sectionType: 'ServicePage', sectionOrder: ['PageBanner', 'ServicePage'] },
    { id: 'team', label: 'Our Team', sectionType: 'TeamPage', sectionOrder: ['PageBanner', 'TeamPage'] },
    { id: 'faq', label: 'FAQ', sectionType: 'FaqPage', sectionOrder: ['PageBanner', 'FaqPage'] },
    { id: 'contact', label: 'Contact Us', sectionType: 'ContactPage', sectionOrder: ['PageBanner', 'ContactPage'] },
    { id: 'book-appointment', label: 'Book Appointment', sectionType: 'AppointmentPage', sectionOrder: ['PageBanner', 'AppointmentPage', 'WorkingProcess'] },
    { id: 'thank-you', label: 'Thank You', sectionType: 'ThankYouPage', sectionOrder: ['ThankYouPage'] },
  ],
  homeSectionOrder: [
    'Topbar',
    'Header',
    'Banner',
    'About',
    'Service',
    'Stats',
    'Team',
    'Testimonial',
    'FAQ',
    'Footer',
  ],
  sectionVariants: {
    Topbar: 'MediCareTopbar1',
    Header: 'MediCareHeader1',
    Footer: 'MediCareFooter1',
    Banner: 'MediCareHeroBanner1',
    About: 'MediCareAboutUs1',
    Service: 'MediCareServices1',
    Stats: 'MediCareStats1',
    Team: 'MediCareTeam1',
    Testimonial: 'MediCareTestimonials1',
    FAQ: 'MediCareFaq1',
    PageBanner: 'MediCarePageBanner1',
    AboutPage: 'MediCareAboutUs1',
    Mission: 'MediCareMissionAndVision1',
    WhyChooseUs: 'MediCareWhyChooseUs1',
    ServicePage: 'MediCareServices1',
    TeamPage: 'MediCareTeam1',
    FaqPage: 'MediCareFaq1',
    ContactPage: 'MediCareContactPage1',
    AppointmentPage: 'MediCareBookAppointment1',
    WorkingProcess: 'MediCareWorkingProcess1',
    ThankYouPage: 'MediCareThankYouPage1',
  },
  variables: {
    '--font-body': '"Plus Jakarta Sans", Arial, Helvetica, sans-serif',
    '--font-heading': '"Plus Jakarta Sans", Arial, Helvetica, sans-serif',
    '--primary-bg': '#00a859',
    '--primary-text': '#ffffff',
    '--secondary-bg': '#043365',
    '--secondary-text': '#ffffff',
    '--header-bg': '#ffffff',
    '--header-text': '#043365',
    '--hero-bg': '#043365',
    '--hero-title': '#043365',
    '--primary-pretitle-text': '#00a859',
    '--primary-title-text': '#043365',
    '--primary-subtitle-text': '#475569',
    '--secondary-pretitle-text': '#00a859',
    '--secondary-title-text': '#ffffff',
    '--secondary-subtitle-text': '#e2e8f0',
    '--primary-link-bg': '#043365',
    '--primary-link-color': '#ffffff',
    '--secondary-link-bg': '#00a859',
    '--secondary-link-color': '#ffffff',
    '--text-white': 'white',
    '--blue-bg': '#043365',
    '--lightcream-bg': '#f4f9fb',
  },
  order: 17,
  status: 'Active',
};

async function main() {
  const category = await prisma.category.upsert({
    where: { slug: CATEGORY_SLUG },
    create: {
      order: 6,
      name: 'Health & Wellness',
      slug: CATEGORY_SLUG,
      icon: 'lucide-heart-pulse',
      description: 'Clinic and healthcare websites',
      status: 'Active',
    },
    update: {
      name: 'Health & Wellness',
      status: 'Active',
    },
  });

  const clash = await prisma.template.findFirst({
    where: { numericId: template.numericId, NOT: { key: KEY } },
  });
  if (clash) {
    await prisma.template.update({
      where: { id: clash.id },
      data: { numericId: template.numericId + 100000 },
    });
    console.log(`✓ Moved numericId clash from ${clash.key}`);
  }

  const row = await prisma.template.upsert({
    where: { key: KEY },
    create: template,
    update: template,
  });
  console.log(`✓ Template ${row.key} — ${row.title}`);

  const contents = await prisma.categoryContent.findMany();
  for (const content of contents) {
    const keys = Array.isArray(content.templateKeys) ? content.templateKeys : [];
    if (content.categorySlug === CATEGORY_SLUG || !keys.includes(KEY)) continue;
    await prisma.categoryContent.update({
      where: { id: content.id },
      data: { templateKeys: keys.filter((key) => key !== KEY) },
    });
    console.log(`✓ Removed from ${content.categoryName}`);
  }

  const existing = contents.find((content) => content.categorySlug === CATEGORY_SLUG);
  const keys = Array.isArray(existing?.templateKeys)
    ? existing.templateKeys.filter((key) => key !== KEY)
    : [];

  await prisma.categoryContent.upsert({
    where: { categorySlug: CATEGORY_SLUG },
    create: {
      categorySlug: CATEGORY_SLUG,
      categoryName: category.name,
      templateKeys: [KEY],
      sections: {},
      status: 'Active',
    },
    update: {
      categoryName: category.name,
      templateKeys: [...keys, KEY],
      status: 'Active',
    },
  });
  console.log(`✓ Linked to ${category.name}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
