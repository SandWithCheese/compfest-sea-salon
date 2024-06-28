import { Branch } from "@/types/branch";
import { Service } from "@/types/service";

export type BranchWithServices = Branch & {
  services: {
    serviceId: string;
    service: Service;
  }[];
};

export type BranchServices = BranchWithServices[];
