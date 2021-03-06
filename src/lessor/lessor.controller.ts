import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
  UploadedFiles,
  UseInterceptors,
  Res,
  Put,
} from '@nestjs/common';
import { LessorService } from './lessor.service';
import { CreateLessorDto } from './dto/create-lessor.dto';
import { UpdateLessorDto } from './dto/update-lessor.dto';
import { BenChoThue as Lessor } from '../entities/BenChoThue';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

import { AnyFilesInterceptor } from '@nestjs/platform-express';
import {
  CANNOT_POST_WITHOUT_BODY,
  CANNOT_POST_WITHOUT_ID,
} from 'src/constant/constant';

@ApiTags('Lessor')
@Controller('lessor')
export class LessorController {
  constructor(private readonly lessorService: LessorService) {}

  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'partnerID', required: false })
  @ApiOkResponse({ type: Lessor, isArray: true })
  @ApiNotFoundResponse()
  @Get()
  async getAll(
    @Res() res: Response,
    @Query('q') q?: string,
    @Query('partnerID') partnerID?: string,
  ): Promise<void> {
    const lessors = await this.lessorService.getAll(q, partnerID);
    res.status(200).json({ success: true, body: lessors });
  }

  @Get(':id')
  @ApiOkResponse({ type: Lessor })
  @ApiNotFoundResponse()
  async getOneById(@Param('id') id: string): Promise<Lessor> {
    const lessor = this.lessorService.getOneById(id);
    if (!lessor) {
      throw new NotFoundException();
    }
    return lessor;
  }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(
    @Body() createLessorDto: CreateLessorDto,
    @UploadedFiles() hinhAnhBcts: Array<Express.Multer.File>,
    @Res() res: Response,
  ) {
    if (!createLessorDto) {
      res
        .status(400)
        .json({ success: false, message: CANNOT_POST_WITHOUT_BODY });
    }
    try {
      const newLessor = await this.lessorService.create(
        createLessorDto,
        hinhAnhBcts,
      );
      res.status(201).json({ success: true, body: newLessor });
    } catch (err) {
      res.status(400).json({ success: false, message: err });
    }
  }

  @Put(':id')
  @UseInterceptors(AnyFilesInterceptor())
  async update(
    @Param('id') id: string,
    @Body() updateLessorDto: UpdateLessorDto,
    @UploadedFiles() hinhAnhBcts: Array<Express.Multer.File>,
    @Res() res: Response,
  ) {
    if (!updateLessorDto) {
      res
        .status(400)
        .json({ success: false, message: CANNOT_POST_WITHOUT_BODY });
    }
    try {
      const updateLessor = await this.lessorService.update(
        id,
        updateLessorDto,
        hinhAnhBcts,
      );
      res.status(200).json({ success: true, body: updateLessor });
    } catch (err) {
      res.status(400).json({ success: false, message: err });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    if (!id) {
      res.status(400).json({ success: false, message: CANNOT_POST_WITHOUT_ID });
    }
    try {
      const deleteLessor = await this.lessorService.remove(id);
      res.status(200).json({ success: true, body: deleteLessor });
    } catch (err) {
      res.status(400).json({ success: false, message: err });
    }
  }

  @Put('/average/:id')
  async updateAveragePrice(@Param('id') id: string, @Res() res: Response) {
    if (!id) {
      return res
        .status(404)
        .json({ success: false, message: CANNOT_POST_WITHOUT_ID });
    }
    try {
      const updateLessor = await this.lessorService.updateAveragePrice(id);
      res.status(200).json({ success: true, body: updateLessor });
    } catch (err) {
      res.status(400).json({ success: false, message: err });
    }
  }
}
