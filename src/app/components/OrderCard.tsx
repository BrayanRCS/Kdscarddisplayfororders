import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Clock, User, Hash } from "lucide-react";

export interface OrderItem {
  nombre: string;
  cantidad: number;
  precio: number;
  notas?: string;
}

export interface Order {
  id: string;
  numeroOrden: number;
  alumno: {
    nombre: string;
  };
  items: OrderItem[];
  total: number;
  timestamp: Date;
  estado: "en-proceso" | "listo";
}

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, newStatus: "en-proceso" | "listo") => void;
}

export function OrderCard({ order, onStatusChange }: OrderCardProps) {
  const isReady = order.estado === "listo";

  const handleToggle = (checked: boolean) => {
    onStatusChange(order.id, checked ? "listo" : "en-proceso");
  };

  return (
    <Card className={`transition-all ${isReady ? "bg-green-50 dark:bg-green-950/20 border-green-300 dark:border-green-800" : ""}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Hash className="size-5 text-muted-foreground" />
              <CardTitle>Orden #{order.numeroOrden}</CardTitle>
              <Badge variant={isReady ? "default" : "secondary"}>
                {isReady ? "Listo" : "En Proceso"}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="size-4" />
              <span>{new Date(order.timestamp).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">{isReady ? "Listo" : "En Proceso"}</span>
              <Switch checked={isReady} onCheckedChange={handleToggle} />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Datos del Alumno */}
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <User className="size-4 text-muted-foreground" />
            <span className="text-sm font-medium">Datos del Alumno</span>
          </div>
          <div className="space-y-1 text-sm">
            <p className="font-medium">{order.alumno.nombre}</p>
          </div>
        </div>

        {/* Items del Pedido */}
        <div>
          <p className="text-sm font-medium mb-2">Pedido</p>
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-start gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="shrink-0">
                      {item.cantidad}x
                    </Badge>
                    <span className="text-sm">{item.nombre}</span>
                  </div>
                  {item.notas && (
                    <p className="text-xs text-muted-foreground mt-1 ml-11">
                      Nota: {item.notas}
                    </p>
                  )}
                </div>
                <span className="text-sm font-medium whitespace-nowrap">
                  ${item.precio.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="pt-3 border-t flex justify-between items-center">
          <span className="font-medium">Total</span>
          <span className="text-lg font-bold">${order.total.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
}