/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { PlusIcon, CheckIcon } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

interface AddServiceSheetProps {
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
}

const AddServiceSheet: React.FC<AddServiceSheetProps> = ({ setServices }) => {
  const [companyName, setCompanyName] = useState<string>("");
  const [resale, setResale] = useState<string>("");
  const [attendanceNumber, setAttendanceNumber] = useState<number>(0);
  const [sellerName, setSellerName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [quantityItems, setQuantityItems] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [boxCode, setBoxCode] = useState<number>(0);
  const [items, setItems] = useState<
    { name: string; quantity: number; value: number }[]
  >([]);

  const { toast } = useToast();

  const getNextId = async () => {
    try {
      const response = await axios.get("http://localhost:5000/services");
      const services: Service[] = response.data as Service[];
      return services.length;
    } catch (error) {
      console.error("Error fetching services:", error);
      return 0;
    }
  };

  const handleAddService = async () => {
    const nextId = await getNextId();

    const newService = {
      id: nextId.toString(),
      companyName,
      resale,
      attendanceNumber: Number(attendanceNumber),
      sellerName,
      totalValue: Number(totalValue),
      quantityItems: Number(quantityItems),
      boxCode,
      status: "Aguardando" as const,
      address,
      items: items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        value: item.value,
      })),
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/services",
        newService
      );

      if (response.status === 201) {
        setServices((prevServices: Service[]) => [...prevServices, newService]);

        toast({
          variant: "success",
          title: "OS CRIADA!",
          description: `A Ordem de Serviço foi criada com sucesso.`,
        });
      }
    } catch (error) {
      console.error("Error adding service:", error);
      toast({
        variant: "destructive",
        title: "Erro ao CRIAR OS!",
        description: `Ocorreu um erro ao tentar criar a OS. Tente novamente.`,
      });
    }
  };

  const handleAddItem = () => {
    setItems([...items, { name: "", quantity: 0, value: 0 }]);
  };

  const handleItemChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" id="addServiceButton">
          <PlusIcon /> Criar Serviço
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Criar serviço</SheetTitle>
          <SheetDescription>
            Preencha as informações do novo entregador abaixo.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <fieldset className="border p-4 mt-4">
            <legend className="text-lg font-semibold">Dados da Entrega</legend>
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
          </fieldset>

          <fieldset className="border p-4 mt-4">
            <legend className="text-lg font-semibold">
              Itens a serem entregues
            </legend>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 items-center gap-4"
                >
                  <Input
                    placeholder="Nome do Item"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(index, "name", e.target.value)
                    }
                    className="col-span-2"
                  />
                  <Input
                    placeholder="Quantidade"
                    value={item.quantity}
                    type="number"
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "quantity",
                        Number(e.target.value)
                      )
                    }
                    className="col-span-1"
                  />
                  <Input
                    placeholder="Valor"
                    value={item.value}
                    type="number"
                    onChange={(e) =>
                      handleItemChange(index, "value", Number(e.target.value))
                    }
                    className="col-span-1"
                  />
                </div>
              ))}
              <Button type="button" onClick={handleAddItem}>
                Adicionar Item <PlusIcon />
              </Button>
            </div>
          </fieldset>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={handleAddService}>
              Salvar <CheckIcon />
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddServiceSheet;
