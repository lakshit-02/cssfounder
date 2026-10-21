/**
 * Seed Health & Wellness layouts for admin Custom Layouts.
 * Keys match frontend sectionRegistry (MediCareHeader1, ...).
 * Run: npm run db:seed:health-layouts -w backend
 */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const CATEGORY_SLUG = 'health-and-wellness';

const layouts = [
  ['MediCareTopbar1', 'Health Topbar', 'Topbar', 'home'],
  ['MediCareHeader1', 'Health Header', 'Header', 'home'],
  ['MediCareHeroBanner1', 'Health Banner', 'Banner', 'home'],
  ['MediCareAboutUs1', 'Health About', 'About', 'home'],
  ['MediCareServices1', 'Health Services', 'Service', 'home'],
  ['MediCareStats1', 'Health Stats', 'Stats', 'home'],
  ['MediCareTeam1', 'Health Team', 'Team', 'home'],
  ['MediCareTestimonials1', 'Health Testimonials', 'Testimonial', 'home'],
  ['MediCareFaq1', 'Health FAQ', 'FAQ', 'home'],
  ['MediCareFooter1', 'Health Footer', 'Footer', 'home'],
  ['MediCarePageBanner1', 'Health Page Banner', 'PageBanner', 'page'],
  ['MediCareMissionAndVision1', 'Health Mission', 'Mission', 'page'],
  ['MediCareWhyChooseUs1', 'Health Why Choose Us', 'WhyChooseUs', 'page'],
  ['MediCareContactPage1', 'Health Contact', 'ContactPage', 'page'],
  ['MediCareWorkingProcess1', 'Health Working Process', 'WorkingProcess', 'page'],
  ['MediCareBookAppointment1', 'Health Book Appointment', 'AppointmentPage', 'page'],
  ['MediCareThankYouPage1', 'Health Thank You', 'ThankYouPage', 'page'],
];

async function main() {
  await prisma.category.upsert({
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

  let created = 0;
  let updated = 0;
  for (let index = 0; index < layouts.length; index += 1) {
    const [key, name, sectionType, scope] = layouts[index];
    const existing = await prisma.layout.findUnique({ where: { key } });
    await prisma.layout.upsert({
      where: { key },
      create: {
        key,
        name,
        sectionType,
        sectionNumber: 1,
        categorySlug: CATEGORY_SLUG,
        scope,
        order: index + 1,
        status: 'Active',
        description: 'Health & Wellness',
      },
      update: {
        name,
        sectionType,
        scope,
        categorySlug: CATEGORY_SLUG,
        status: 'Active',
        description: 'Health & Wellness',
      },
    });
    if (existing) updated += 1;
    else created += 1;
    console.log(`✓ ${key} (${sectionType} / ${scope} / ${CATEGORY_SLUG})`);
  }
  console.log(
    `\nDone: ${layouts.length} Health layouts (created ${created}, updated ${updated})`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
