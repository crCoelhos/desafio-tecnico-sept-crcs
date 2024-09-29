import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Service } from "@/types/service";
import "./AddServiceSheet.scss";

interface AddServiceSheetProps {
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
}

const AddServiceSheet: React.FC<AddServiceSheetProps> = ({ setServices }) => {
  const [companyName, setCompanyName] = useState<string>("");
  const [resale, setResale] = useState<string>("");
  const [attendanceNumber, setAttendanceNumber] = useState<number>();
  const [sellerName, setSellerName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [quantityItems, setQuantityItems] = useState<number>();
  const [totalValue, setTotalValue] = useState<number>();
  const [boxCode, setBoxCode] = useState<number>();

  const getNextId = async () => {
    try {
      const response = await axios.get("http://localhost:5000/employees");
      const deliveries: Service[] = response.data as Service[];
      return deliveries.length;
    } catch (error) {
      console.error("Error fetching deliveries:", error);
      return 0;
    }
  };

  const handleAddService = async () => {
    const nextId = await getNextId();

    const newService = {
      id: nextId.toString(),
      companyName: companyName,
      resale: resale,
      attendanceNumber: Number(attendanceNumber),
      sellerName: sellerName,
      totalValue: Number(totalValue),
      quantityItems: Number(quantityItems),
      boxCode: boxCode,
      status: "Aguardando" as const,
      address: address,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/services",
        newService
      );

      if (response.status === 201) {
        setServices((prevServices: Service[]) => [
          ...prevServices,
          newService as Service,
        ]);
      }
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" id="addServiceButton">
          <PlusIcon /> Criar Serviço
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Criar serviço</SheetTitle>
          <SheetDescription>
            Preencha as informações do novo entregador abaixo.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="companyName" className="text-right">
              Nome da empresa
            </Label>
            <Input
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="resale" className="text-right">
              Revenda
            </Label>
            <Input
              id="resale"
              value={resale}
              onChange={(e) => setResale(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sellerName" className="text-right">
              Nome do vendedor
            </Label>
            <Input
              id="sellerName"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="attendanceNumber" className="text-right">
              Numero do atendimento
            </Label>
            <Input
              id="attendanceNumber"
              value={attendanceNumber}
              onChange={(e) => setAttendanceNumber(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantityItems" className="text-right">
              Quantidade de itens
            </Label>
            <Input
              id="quantityItems"
              value={quantityItems}
              onChange={(e) => setQuantityItems(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="totalValue" className="text-right">
              Valor total
            </Label>
            <Input
              id="totalValue"
              value={totalValue}
              onChange={(e) => setTotalValue(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Endereço
            </Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="boxCode" className="text-right">
              Código da caixa
            </Label>
            <Input
              id="boxCode"
              value={boxCode}
              onChange={(e) => setBoxCode(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={handleAddService}>Salvar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddServiceSheet;
