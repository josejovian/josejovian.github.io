import Head from "next/head";

export interface MetaProps {
  title?: string;
  page?: string;
  description?: string;
}

export function Meta({
  title,
  description = "Jose's personal portfolio website.",
  page,
}: MetaProps) {
  const displayTitle = title ? title : `${page} - Jose Jovian`;

  return (
    <Head>
      <title>{displayTitle}</title>
      <meta charSet="UTF-8" />
      <meta name="description" content={description} />
      <meta name="author" content="Jose Jovian" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  );
}
