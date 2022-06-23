import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { GetCurrentUser } from 'src/utils/decorators'

import { DatasetService } from './dataset.service'

@Controller('dataset')
export class DatasetController {
  constructor(private datasetService: DatasetService) {}

  @Get('all')
  getAll() {
    return this.datasetService.getAll()
  }

  @Post('uploadArchive')
  @UseInterceptors(FileInterceptor('file'))
  uploadArchive(@UploadedFile() file) {
    return this.datasetService.uploadArchive(file)
  }

  @Post('add')
  addDataset(@Body() dto) {
    return this.datasetService.addDataset(dto)
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

  @Post('addDownload')
  addDownload(@Body('datasetId') datasetId) {
    return this.datasetService.addDownload(datasetId)
  }
}
