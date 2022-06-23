import { Body, Controller, Get, Param, Post } from '@nestjs/common'

import { CommentService } from './comment.service'

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('all/:datasetId')
  getAll(@Param('datasetId') datasetId: number) {
    return this.commentService.getAll(datasetId)
  }

  @Post('add')
  add(@Body() dto) {
    return this.commentService.add(dto.userId, dto.dataId, dto.text)
  }
}
