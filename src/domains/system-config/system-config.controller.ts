import { Body, Controller, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { SystemConfigService } from "./system-config.service";
import { FindSystemConfigDto, GetDetailSystemConfigDto, UpdateSystemConfigDto } from "./dtos";

@ApiTags("System Config")
@ApiBearerAuth("JWT-auth")
@Controller("system-config")
export class SystemConfigController {
  constructor(private readonly systemConfigService: SystemConfigService) {}

  @Post("list")
  @ApiOperation({ summary: "Danh sách cấu hình hệ thống" })
  list(@Body() dto?: FindSystemConfigDto) {
    return this.systemConfigService.list(dto);
  }

  @Post("detail")
  @ApiOperation({ summary: "Chi tiết cấu hình hệ thống theo mã (code)" })
  detail(@Body() dto: GetDetailSystemConfigDto) {
    return this.systemConfigService.detail(dto.code);
  }

  @Put("update")
  @ApiOperation({ summary: "Cập nhật giá trị cấu hình hệ thống" })
  update(@Body() dto: UpdateSystemConfigDto) {
    return this.systemConfigService.update(dto);
  }
}
