import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserEntity } from '../../modules/users/user.entity';

export const CurrentUser = createParamDecorator(
    (data: keyof UserEntity | undefined, ctx: ExecutionContext): UserEntity | any => {
        const request = ctx.switchToHttp().getRequest();
        const user: UserEntity = request.user;
        return data ? user[data] : user;
    },
);