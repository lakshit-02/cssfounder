/**
 * Seed Beauty & Personal Care layouts for admin Custom Layouts.
 * Keys match frontend sectionRegistry (HairAtelierHeader1, ...).
 * Run: npm run db:seed:beauty-layouts -w backend
 */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const CATEGORY_SLUG = 'beauty-personal-care';

const layouts = [
  ['HairAtelierHeader1', 'Beauty Header', 'Header', 'home'],
  ['HairAtelierHeroBanner1', 'Beauty Banner', 'Banner', 'home'],
  ['HairAtelierAboutUs1', 'Beauty About', 'About', 'home'],
  ['HairAtelierStats1', 'Beauty Stats', 'Stats', 'home'],
  ['HairAtelierServices1', 'Beauty Services', 'Service', 'home'],
  ['HairAtelierWhyChooseUs1', 'Beauty Why Choose Us', 'WhyChooseUs', 'home'],
  ['HairAtelierGallery1', 'Beauty Gallery', 'Gallery', 'home'],
  ['HairAtelierTestimonials1', 'Beauty Testimonials', 'Testimonial', 'home'],
  ['HairAtelierBlogNews1', 'Beauty Blog', 'Blog', 'home'],
  ['HairAtelierFooter1', 'Beauty Footer', 'Footer', 'home'],
  ['HairAtelierPageBanners1', 'Beauty Page Banner', 'PageBanner', 'page'],
  ['HairAtelierAboutPage1', 'Beauty About Page', 'AboutPage', 'page'],
  ['HairAtelierServicePage1', 'Beauty Services Page', 'ServicePage', 'page'],
  ['HairAtelierServiceDetailPage1', 'Beauty Service Detail', 'ServiceDetailPage', 'page'],
  ['HairAtelierGalleryPage1', 'Beauty Gallery Page', 'GalleryPage', 'page'],
  ['HairAtelierBlogPage1', 'Beauty Blog Page', 'BlogPage', 'page'],
  ['HairAtelierBlogDetailPage1', 'Beauty Blog Detail', 'BlogDetailPage', 'page'],
  ['HairAtelierContactPage1', 'Beauty Contact Details', 'ContactPage', 'page'],
  ['HairAtelierContactForm1', 'Beauty Contact Form', 'ContactForm', 'page'],
  ['HairAtelierContactMap1', 'Beauty Contact Map', 'ContactMap', 'page'],
  ['HairAtelierQuotePage1', 'Beauty Get a Quote', 'QuotePage', 'page'],
  ['HairAtelierThankYouPage1', 'Beauty Thank You', 'ThankYouPage', 'page'],
];

async function main() {
  await prisma.category.upsert({
    where: { slug: CATEGORY_SLUG },
    create: {
      order: 5,
      name: 'Beauty & Personal Care',
      slug: CATEGORY_SLUG,
      icon: 'lucide-sparkles',
      description: 'Salon and beauty websites',
      status: 'Active',
    },
    update: {
      name: 'Beauty & Personal Care',
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
        description: 'Beauty & Personal Care',
      },
      update: {
        name,
        sectionType,
        scope,
        categorySlug: CATEGORY_SLUG,
        status: 'Active',
        description: 'Beauty & Personal Care',
      },
    });
    if (existing) updated += 1;
    else created += 1;
    console.log(`✓ ${key} (${sectionType} / ${scope} / ${CATEGORY_SLUG})`);
  }
  console.log(
    `\nDone: ${layouts.length} Beauty layouts (created ${created}, updated ${updated})`,
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
