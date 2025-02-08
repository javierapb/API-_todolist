import { 
  Controller, 
  Get, 
  Post, 
  Put,
  Delete, 
  Body, 
  Param,
  HttpException,
  HttpStatus,
  UseInterceptors
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './interfaces/task.interface';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create')
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      return await this.tasksService.create(createTaskDto);
    } catch (error) {
      throw new HttpException('Error al crear la tarea', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(): Promise<Task[]> {
    try {
      return await this.tasksService.findAll();
    } catch (error) {
      throw new HttpException('Error al obtener las tareas', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    try {
      const task = await this.tasksService.findOne(id);
      if (!task) {
        throw new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
      }
      return task;
    } catch (error) {
      throw new HttpException('Error al obtener la tarea', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    try {
      const task = await this.tasksService.update(id, updateTaskDto);
      if (!task) {
        throw new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
      }
      return task;
    } catch (error) {
      throw new HttpException('Error al actualizar la tarea', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Task> {
    try {
      const task = await this.tasksService.delete(id);
      if (!task) {
        throw new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
      }
      return task;
    } catch (error) {
      throw new HttpException('Error al eliminar la tarea', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
} 