// Sanity Queries
export const getFeatured = `*[_type == "featured"]{
    ...,
    restaurants[] -> {
      ...,
      type -> {
        ...,
        name,
      },
      dishes[] -> {
        ...,
      }
    }
  }`;

export const getCategories = `*[_type == "category"]{
    ...,
  }`;
