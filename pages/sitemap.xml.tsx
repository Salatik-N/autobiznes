import { GetServerSideProps } from "next";
import {GET_ALL_PAGES} from '../lib/api'
import { initializeApollo } from "../lib/apollo";
import { format } from 'date-fns';
import { useQuery } from "@apollo/client";

const apolloClient = initializeApollo()

export default function SiteMap(){
  return null
}

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
  const sitemap = await generateSitemap()
  ctx.res.setHeader('Content-Type', 'text/xml')
  ctx.res.write(sitemap)
  ctx.res.end()

  return {
      props: {}
  }
}

async function generateSitemap(): Promise<string> {
  const pages = await apolloClient.query({
    query: GET_ALL_PAGES
  })

    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.data.pages.edges
        .map((page) => {
          const lastEditDate = page.node.seo.opengraphModifiedTime ? format(new Date(page.node.seo.opengraphModifiedTime), 'yyyy-MM-dd') : '2024-01-01'

          return `
        <url>
            <loc>${page.node.slug === 'home' ? 'https://autobiznes.by' : 'https://autobiznes.by/' + page.node.slug}</loc>
            <lastmod>${lastEditDate}</lastmod>
        </url>
      `;
        }).join('')}
      ${pages.data.transportCategories.edges
        .map((transportCategory) => {
          if(transportCategory.node.slug === 'cargo-transport' || transportCategory.node.slug === 'passenger-transport'){
            return
          }
          const lastEditDate = transportCategory.node.seo.opengraphModifiedTime ? format(new Date(transportCategory.node.seo.opengraphModifiedTime), 'yyyy-MM-dd') : '2024-01-01'

          return `
        <url>
            <loc>https://autobiznes.by/transports/${transportCategory.node.slug}</loc>
            <lastmod>${lastEditDate}</lastmod>
        </url>
      `;
        }).join('')}
        ${pages.data.transports.edges
          .map((transport) => {  
            const category = transport.node.transportCategories.edges[0].node.slug
            const lastEditDate = transport.node.seo.opengraphModifiedTime ? format(new Date(transport.node.seo.opengraphModifiedTime), 'yyyy-MM-dd') : '2024-01-01'

            return `
          <url>
              <loc>https://autobiznes.by/transports/${category}/${transport.node.databaseId}</loc>
              <lastmod>${lastEditDate}</lastmod>
          </url>
        `;
          }).join('')}
    </urlset>`
}

// async function getAllPages() {
//   const { data, fetchMore } = useQuery(GET_ALL_PAGES, {
//     variables: { first: 10, after: null },
//     notifyOnNetworkStatusChange: true,
//   })

//   const haveMorePosts = Boolean(data.pages.pageInfo.hasNextPage)
//   const pageInfo = data?.cargos?.pageInfo || {}

//   while (haveMorePosts) {
//     const response = await apolloClient.query({
//       query: GET_ALL_PAGES,
//       variables: { first: 1000, after: null },
//       notifyOnNetworkStatusChange: true,
//     })

//     const pages = response.data.pages.edges.map(edge => edge.node);
//     allPages = allPages.concat(pages);
//     hasNextPage = response.data.pages.pageInfo.hasNextPage;
//     cursor = response.data.pages.edges[response.data.pages.edges.length - 1].cursor;
//   }

//   return allPages;
// }
