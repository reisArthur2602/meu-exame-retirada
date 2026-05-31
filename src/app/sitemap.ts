import { siteUrl } from '@/constants';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {


    return [
        {
            url: siteUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
    ];
}
