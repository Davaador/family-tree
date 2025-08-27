import { ImageField } from 'pages/private/private.model';
import { CustomerDetail } from 'pages/public/auth/auth.model';

export namespace CustomerModel {
  export interface Customer {
    age: number;
    birthDate: Date | string;
    editCustomer: boolean;
    email: string;
    firstName: string;
    gender: string;
    id: number;
    lastName: string;
    phoneNumber: string;
    register: string;
    surName?: string;
    user: CustomerDetail;
    wife: Customer;
    husband: Customer;
  }

  export interface CoupleCustomer {
    coupleId: number;
  }

  export interface BiographyCustomer {
    detailBiography: string;
  }

  export interface ParentDto {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: Date | string;
    // spouse?: ParentDto;
    wife?: ParentDto;
    husband?: ParentDto;

    children?: ParentDto[];
    profileImage?: ImageField;
  }

  export interface SubFamilyTreeProps {
    level: number;
    treeData: CustomerModel.ParentDto;
    addChildren?: (id: number[]) => void;
    parentId: number[];
  }
}

export enum Gender {
  MALE = '0',
  FEMALE = '1',
}
