/*
 * Project Name : "Aerosphare Suit"
 *
 * Author: Abu Sayed Polin
 * Copyright: Brotecs Technologies Limited
 *
 * Created: 2024-02-26 12:58:52
 * Modified: 2024-02-26 12:58:52
 *
 * Component : Title
 * Description :
 */

// Import the Helmet component from the "react-helmet-async" library.
import { Helmet } from "react-helmet-async";

// ------------------------------------------------------------------
// Interface for the TitleProps that defines the properties for the Title component.
// Parameters:
// - name: The name to be used as the title.
// - link: Optional object for specifying a link tag with "rel" and "href" attributes.
// ------------------------------------------------------------------
interface TitleProps {
  name: string;
  link?: {
    rel?: string;
    href?: string;
  };
}

// ------------------------------------------------------------------
// Title component for setting the HTML title and optional link tag in the document head.
// Parameters:
// - name: The name to be used as the title.
// - link: Optional link tag information with "rel" and "href" attributes.
// ------------------------------------------------------------------
const Title = ({ name, link }: TitleProps) => {
  return (
    <Helmet>
      {/* Set the HTML title with the specified name and "Aerosphare Suite" as a suffix. */}
      <title>{name} | Nippon Steel Engineering</title>

      {/* Create an optional link tag with specified "rel" and "href" attributes. */}
      <link
        rel={link?.rel ? link?.rel : ""} // Set the "rel" attribute or an empty string if not provided.
        href={link?.href ? link?.href : ""} // Set the "href" attribute or an empty string if not provided.
      />
    </Helmet>
  );
};

// Export the Title component for use in other parts of your application.
export default Title;
