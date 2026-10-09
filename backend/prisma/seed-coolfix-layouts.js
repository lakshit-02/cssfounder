/**
 * Seed CoolFix section variants for admin Custom Layouts.
 * Keys match frontend sectionRegistry (CoolFixFooter1, CoolFixHeader1, ...).
 * Run: npm run db:seed:coolfix-layouts -w backend
 */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const layouts = [
  ['CoolFixTopbar1', 'CoolFix Topbar', 'Topbar', 'home'],
  ['CoolFixHeader1', 'CoolFix Header', 'Header', 'home'],
  ['CoolFixBanner1', 'CoolFix Banner', 'Banner', 'home'],
  ['CoolFixStats1', 'CoolFix Stats', 'Stats', 'home'],
  ['CoolFixAbout1', 'CoolFix About', 'About', 'home'],
  ['CoolFixService1', 'CoolFix Services', 'Service', 'home'],
  ['CoolFixWhyChooseUs1', 'CoolFix Why Choose Us', 'WhyChooseUs', 'home'],
  ['CoolFixHighlights1', 'CoolFix Highlights', 'Highlights', 'home'],
  ['CoolFixHowWeWork1', 'CoolFix How We Work', 'HowWeWork', 'home'],
  ['CoolFixCTA1', 'CoolFix CTA', 'CTA', 'home'],
  ['CoolFixTestimonial1', 'CoolFix Testimonials', 'Testimonial', 'home'],
  ['CoolFixGallery1', 'CoolFix Gallery', 'Gallery', 'home'],
  ['CoolFixFooter1', 'CoolFix Footer', 'Footer', 'home'],
  ['CoolFixAboutPage1', 'CoolFix About Page', 'AboutPage', 'page'],
  ['CoolFixServicePage1', 'CoolFix Services Page', 'ServicePage', 'page'],
  ['CoolFixServiceDetailPage1', 'CoolFix Service Detail', 'ServiceDetailPage', 'page'],
  ['CoolFixGalleryPage1', 'CoolFix Gallery Page', 'GalleryPage', 'page'],
  ['CoolFixContactPage1', 'CoolFix Contact Page', 'ContactPage', 'page'],
  ['CoolFixGetQuote1', 'CoolFix Get a Quote', 'GetQuotePage', 'page'],
  ['CoolFixBookService1', 'CoolFix Book a Service', 'BookServicePage', 'page'],
];

async function main() {
  const footer = await prisma.layout.findUnique({
    where: { key: 'CoolFixFooter1' },
  });
  const categorySlug = footer?.categorySlug ?? null;

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
        categorySlug,
        scope,
        order: index + 1,
        status: 'Active',
        description: 'CoolFix AC Repair & Services',
      },
      update: {
        name,
        sectionType,
        scope,
        status: 'Active',
        description: 'CoolFix AC Repair & Services',
      },
    });
    if (existing) updated += 1;
    else created += 1;
    console.log(`✓ ${key} (${sectionType} / ${scope})`);
  }
  console.log(
    `\nDone: ${layouts.length} CoolFix layouts (created ${created}, updated ${updated})`,
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
