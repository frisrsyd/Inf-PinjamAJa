import Category from 'App/Models/Category';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tool from 'App/Models/Tool'
import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite';

export default class ToolsController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({request}: HttpContextContract) {
    const tool = new Tool()
    //store data from request in add-tool page
    const data = request.only(['toolName', 'category', 'stock', 'available', 'status'])

    const toolName = data.toolName
    const categoryName:string = data.category
    const categorySlug = categoryName.toLowerCase().replace(/ /g, '-')
    const slug = data.toolName = data.toolName.toLowerCase().replace(/ /g, '-')
    let image = request.file('image')!
    
    const stock = data.stock = parseInt(data.stock)
    const available = stock
    let status = data.status
    if (available == 0) {
      status = 'Tidak tersedia'
    } else {
      status = 'Tersedia'
    }
    
    await Category.firstOrCreate({name: categoryName}, {slug: categorySlug})
    const getCategory = await Category.findByOrFail('slug', categorySlug)
    const category_id = getCategory.id

    tool.image = Attachment.fromFile(image)
    tool.name = toolName
    tool.slug = slug
    tool.stock = stock
    tool.available = available
    tool.status = status
    tool.category_id = category_id
    await tool.save()
    // return tool
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
