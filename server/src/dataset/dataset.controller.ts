import { Body, Controller, Get, Post } from '@nestjs/common'
import { GetCurrentUser } from 'src/utils/decorators'

import { DatasetService } from './dataset.service'

@Controller('dataset')
export class DatasetController {
  constructor(private datasetService: DatasetService) {}

  @Get('all')
  getAll() {
    return this.datasetService.getAll()
  }

  @Post('add_to_favorite')
  addToFavorite(@Body('datasetId') datasetId: number, @GetCurrentUser() user) {
    return this.datasetService.addToFavorite(datasetId, user.sub)
  }

  @Post('remove_from_favorite')
  removeFromFavorite(@Body('datasetId') datasetId: number, @GetCurrentUser() user) {
    return this.datasetService.removeFromFavorite(datasetId, user.sub)
  }

  @Get('favorites')
  getAllFavorites(@GetCurrentUser() user) {
    return this.datasetService.getAllFavorites(user.sub)
  }
}
