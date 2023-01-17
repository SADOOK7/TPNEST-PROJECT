import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('addcourse')
  create(@Body() createCourseDto: CreateCourseDto, @Request() req: any) {
    return this.courseService.addCourse(req.user.userId, createCourseDto);
  }

  @Get('allcourses')
  findAll() {
    return this.courseService.findAllCourses();
  }

  @Get('coursebyname/:name')
  findByName(@Param('name') name: string) {
    return this.courseService.findByName(name);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('coursebyauthor/:authorId')
  findByAuthor(@Param('authorId') authorId: string) {
    return this.courseService.findByAuthor(+authorId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('updatecourse/:id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto, @Request() req: any) {
    return this.courseService.updateCourse(+id, req.user.userId, updateCourseDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('deletecourse/:id')
  remove(@Param('id') id: string, @Request() req: any) {
    return this.courseService.deleteCourse(+id, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('likecourse/:name')
  likeCourse(@Param('name') name: string, @Request() req: any) {
    return this.courseService.addCourseToFavorites(req.user.userId, name);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('dislikecourse/:name')
  dislikeCourse(@Param('name') name: string, @Request() req: any) {
    return this.courseService.deleteCourseFromFavorites(req.user.userId, name);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('buycourse/:name')
  buyCourse(@Param('name') name: string, @Request() req: any) {
    return this.courseService.buyCourse(req.user.userId, name);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('commentcourse/:name')
  commentCourse(@Param('name') name: string, @Body() comment: string, @Request() req: any) {
    return this.courseService.commentCourse(req.user.userId, name, comment);
  }
}
