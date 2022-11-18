import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../../database/prisma.service';
import { PaymentDTO } from './dto/payment.dto';
// import { CreatePaymentDto } from './dto/create-payment.dto';
// import { UpdatePaymentDto } from './dto/update-payment.dto';

const selectAllInfo = {
  project: {
    select: {
      name: true,
      client: {
        select: {
          firstName: true,
          surname: true,
        },
      },
    },
  },
};

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async create(data: PaymentDTO): Promise<PaymentDTO> {
    return this.prisma.payment
      .create({
        data,
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Duplicate payment name');
          }
        }
        throw error;
      });

    // const paymentExists = await this.prisma.payment.findFirst({
    //   where: {
    //     name: data.name,
    //   },
    // });

    // if (paymentExists) {
    //   throw new Error('Payment already exists');
    // }

    // const payment = await this.prisma.payment.create({
    //   data,
    // });

    // return payment;
  }

  async findAll() {
    return this.prisma.payment.findMany({
      include: selectAllInfo,
    });
  }

  async findByProjectId(id: string) {
    const paymentExists = await this.prisma.payment.findMany({
      where: {
        projectId: id,
      },
      include: selectAllInfo,
    });

    if (!paymentExists) {
      throw new Error('No payment for this project!');
    }

    return paymentExists;
  }

  // async findByClientId(id: string) {
  //   const paymentExists = await this.prisma.payment.findMany({
  //     where: {
  //       Project: {
  //         clientId: id,
  //       },
  //     },
  //     include: selectAllInfo,
  //   });

  //   if (!paymentExists) {
  //     throw new Error('Payment does not exist!');
  //   }

  //   return paymentExists;
  // }

  async update(id: string, data: PaymentDTO) {
    return this.prisma.payment
      .update({
        where: { id },
        data,
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('Payment does not exist');
          }
        }
        throw error;
      });

    // const paymentExists = await this.prisma.payment.findUnique({
    //   where: {
    //     id,
    //   },
    // });

    // if (!paymentExists) {
    //   throw new Error('Payment does not exist!');
    // }

    // return this.prisma.payment.update({
    //   data,
    //   where: {
    //     id,
    //   },
    // });
  }

  async remove(id: string) {
    return this.prisma.payment
      .delete({
        where: { id },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('Payment does not exist');
          }
        }
        throw error;
      });

    // const paymentExists = await this.prisma.payment.findUnique({
    //   where: {
    //     id,
    //   },
    // });

    // if (!paymentExists) {
    //   throw new Error('Payment does not exist!');
    // }

    // return await this.prisma.payment.delete({
    //   where: {
    //     id,
    //   },
    // });
  }
}
