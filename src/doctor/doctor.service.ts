import {prisma} from "../index";
import {Gender} from "@prisma/client";
import {employeeService} from "../employees/employee.controller";

class DoctorService {
    private readonly dType = "Doctor";
    private readonly fieldName = "doctor";

    async create(name: string, cpf: string, phone: string, registration: string, positionId: string, crm: string, gender: Gender): Promise<any> {
        try {
            const employee = await employeeService.create(registration, positionId, name, cpf, phone, gender, this.dType, this.fieldName);
            return await prisma.doctor.create({
                data: {
                    crm,
                    id: employee.id
                },
                select: {
                    id: true,
                    crm: true,
                    Employee: {
                        select: {
                            registration: true,
                            person: {
                                select: {
                                    cpf: true,
                                    phone: true,
                                    name: true,
                                    gender: true
                                }
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update(id: string, name: string, cpf: string, phone: string, registration: string, positionId: string, crm: string, gender: Gender) {
        try {
            await employeeService.update(id, registration, positionId, name, cpf, phone, gender, this.dType, this.fieldName);
            return await prisma.doctor.update({
                where: {id},
                data: {
                    crm
                },
                select: {
                    id: true,
                    crm: true,
                    Employee: {
                        select: {
                            registration: true,
                            person: {
                                select: {
                                    cpf: true,
                                    phone: true,
                                    name: true,
                                    gender: true
                                }
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getAll() {
        try {
            return await prisma.doctor.findMany({
                select: {
                    id: true,
                    crm: true,
                    Employee: {
                        select: {
                            registration: true,
                            person: {
                                select: {
                                    cpf: true,
                                    phone: true,
                                    name: true
                                }
                            }
                        }
                    }
                }
            })
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getById(id: string) {
        try {
            return await prisma.doctor.findUnique({
                where: {id: id},
                select: {
                    id: true,
                    crm: true,
                    Employee: {
                        select: {
                            registration: true,
                            person: {
                                select: {
                                    cpf: true,
                                    phone: true,
                                    name: true
                                }
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(id: string) {
        try {
            await prisma.doctor.delete({where: {id}});
            await prisma.person.delete({where: {id}});
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

export {DoctorService};