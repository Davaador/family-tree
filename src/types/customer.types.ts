import { ImageField } from 'pages/private/private.model';
import { CustomerDetail } from 'pages/public/auth/auth.model';

export namespace CustomerModel {
  export interface AdminCustomer {
    age: number;
    birthDate: Date | string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    register: string;
    surName?: string;
    password: string;
    confirmPassword: string;
    lastNameId?: number;
    id: number;
    isDeceased?: boolean;
    deceasedDate?: Date | string;
    isParent: number;
  }

  export interface Customer extends AdminCustomer {
    editCustomer: boolean;
    gender: string;
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
