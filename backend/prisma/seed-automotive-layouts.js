/**
 * Seed Automotive layouts for admin Custom Layouts.
 * Keys match frontend sectionRegistry (RydoraHeader1, ...).
 * Run: npm run db:seed:automotive-layouts -w backend
 */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const CATEGORY_SLUG = 'automotive';

const layouts = [
  ['RydoraHeader1', 'Automotive Header', 'Header', 'home'],
  ['RydoraHero1', 'Automotive Banner', 'Banner', 'home'],
  ['RydoraFleet1', 'Automotive Fleet', 'Fleet', 'home'],
  ['RydoraAboutUs1', 'Automotive About', 'About', 'home'],
  ['RydoraServices1', 'Automotive Services', 'Service', 'home'],
  ['RydoraWorkingProcess1', 'Automotive Working Process', 'WorkingProcess', 'home'],
  ['RydoraTestimonials1', 'Automotive Testimonials', 'Testimonial', 'home'],
  ['RydoraBrands1', 'Automotive Brands', 'Brands', 'home'],
  ['RydoraBlogNews1', 'Automotive Blog', 'Blog', 'home'],
  ['RydoraFooter1', 'Automotive Footer', 'Footer', 'home'],
  ['RydoraPageBanner1', 'Automotive Page Banner', 'PageBanner', 'page'],
  ['RydoraWhyChooseUs1', 'Automotive Why Choose Us', 'WhyChooseUs', 'page'],
  ['RydoraGallery1', 'Automotive Gallery', 'Gallery', 'page'],
  ['RydoraContactPage1', 'Automotive Contact', 'ContactPage', 'page'],
  ['RydoraEnquiryForm1', 'Automotive Enquiry', 'EnquiryPage', 'page'],
];

async function main() {
  await prisma.category.upsert({
    where: { slug: CATEGORY_SLUG },
    create: {
      order: 7,
      name: 'Automotive',
      slug: CATEGORY_SLUG,
      icon: 'lucide-car',
      description: 'Luxury car rental websites',
      status: 'Active',
    },
    update: {
      name: 'Automotive',
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
        description: 'Automotive',
      },
      update: {
        name,
        sectionType,
        scope,
        categorySlug: CATEGORY_SLUG,
        status: 'Active',
        description: 'Automotive',
      },
    });
    if (existing) updated += 1;
    else created += 1;
    console.log(`✓ ${key} (${sectionType} / ${scope} / ${CATEGORY_SLUG})`);
  }
  console.log(
    `\nDone: ${layouts.length} Automotive layouts (created ${created}, updated ${updated})`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
