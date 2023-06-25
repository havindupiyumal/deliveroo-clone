import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Dish Name',
      validation: (Rule) => Rule.required().error('Please enter a valid dish name'),
    }),
    defineField({
      name: 'short_description',
      type: 'string',
      title: 'Short Description',
      validation: (Rule) => Rule.max(200).error('description cannot be more than 200 characters'),
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Price of the dish in AUD',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image of the Dish',
    }),
  ],
})
