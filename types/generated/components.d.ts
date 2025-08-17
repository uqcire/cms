import type { Schema, Struct } from '@strapi/strapi';

export interface SharedAddress extends Struct.ComponentSchema {
  collectionName: 'components_shared_addresses';
  info: {
    description: 'Address component';
    displayName: 'Address';
  };
  attributes: {
    city: Schema.Attribute.String & Schema.Attribute.Required;
    country: Schema.Attribute.String & Schema.Attribute.Required;
    line1: Schema.Attribute.String & Schema.Attribute.Required;
    postcode: Schema.Attribute.String & Schema.Attribute.Required;
    region: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedBlocks extends Struct.ComponentSchema {
  collectionName: 'components_shared_blocks';
  info: {
    displayName: 'Blocks';
  };
  attributes: {
    content: Schema.Attribute.Component<'shared.content-block', false>;
    cta: Schema.Attribute.Component<'shared.cta-block', false>;
    features: Schema.Attribute.Component<'shared.features-block', false>;
  };
}

export interface SharedContentBlock extends Struct.ComponentSchema {
  collectionName: 'components_shared_content_blocks';
  info: {
    displayName: 'Content Block';
  };
  attributes: {
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    text: Schema.Attribute.RichText;
    title: Schema.Attribute.String;
    type: Schema.Attribute.String;
  };
}

export interface SharedCtaBlock extends Struct.ComponentSchema {
  collectionName: 'components_shared_cta_blocks';
  info: {
    displayName: 'CTA Block';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    text: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedFeature extends Struct.ComponentSchema {
  collectionName: 'components_shared_features';
  info: {
    description: 'Feature component';
    displayName: 'Feature';
  };
  attributes: {
    icon: Schema.Attribute.String;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFeaturesBlock extends Struct.ComponentSchema {
  collectionName: 'components_shared_features_blocks';
  info: {
    displayName: 'Features Block';
  };
  attributes: {
    features: Schema.Attribute.Component<'shared.feature', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_heroes';
  info: {
    description: 'Hero section component';
    displayName: 'Hero';
  };
  attributes: {
    ctaLink: Schema.Attribute.String;
    ctaText: Schema.Attribute.String;
    image: Schema.Attribute.Media;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedOrg extends Struct.ComponentSchema {
  collectionName: 'components_shared_orgs';
  info: {
    description: 'Organization schema.org component';
    displayName: 'Organization';
  };
  attributes: {
    legalName: Schema.Attribute.String;
    orgName: Schema.Attribute.String & Schema.Attribute.Required;
    parentOrganization: Schema.Attribute.String;
  };
}

export interface SharedProductSpecs extends Struct.ComponentSchema {
  collectionName: 'components_shared_product_specs';
  info: {
    description: 'Product specifications component';
    displayName: 'Product Specs';
  };
  attributes: {
    certifications: Schema.Attribute.JSON;
    grade: Schema.Attribute.String & Schema.Attribute.Required;
    moq: Schema.Attribute.String & Schema.Attribute.Required;
    origin: Schema.Attribute.String & Schema.Attribute.Required;
    packaging: Schema.Attribute.String & Schema.Attribute.Required;
    shelfLife: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'SEO metadata component';
    displayName: 'SEO';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    keywords: Schema.Attribute.JSON;
    ogImage: Schema.Attribute.Media;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: 'Social media link component';
    displayName: 'Social Link';
  };
  attributes: {
    icon: Schema.Attribute.String;
    platform: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedUseCase extends Struct.ComponentSchema {
  collectionName: 'components_shared_use_cases';
  info: {
    description: 'Use case component';
    displayName: 'Use Case';
  };
  attributes: {
    icon: Schema.Attribute.String;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.address': SharedAddress;
      'shared.blocks': SharedBlocks;
      'shared.content-block': SharedContentBlock;
      'shared.cta-block': SharedCtaBlock;
      'shared.feature': SharedFeature;
      'shared.features-block': SharedFeaturesBlock;
      'shared.hero': SharedHero;
      'shared.org': SharedOrg;
      'shared.product-specs': SharedProductSpecs;
      'shared.seo': SharedSeo;
      'shared.social-link': SharedSocialLink;
      'shared.use-case': SharedUseCase;
    }
  }
}
