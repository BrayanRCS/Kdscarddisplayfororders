import { useState } from "react";
import { OrderCard, Order } from "./components/OrderCard";
import { Badge } from "./components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";

// Datos de ejemplo para la cafetería escolar
const MOCK_ORDERS: Order[] = [
  {
    id: "1",
    numeroOrden: 101,
    alumno: {
      nombre: "María González Pérez",
    },
    items: [
      { nombre: "Torta de jamón", cantidad: 1, precio: 35.00 },
      { nombre: "Jugo de naranja", cantidad: 1, precio: 15.00 },
    ],
    total: 50.00,
    timestamp: new Date(Date.now() - 5 * 60000),
    estado: "en-proceso",
  },
  {
    id: "2",
    numeroOrden: 102,
    alumno: {
      nombre: "Carlos Ramírez Torres",
    },
    items: [
      { nombre: "Quesadillas", cantidad: 2, precio: 30.00 },
      { nombre: "Agua natural", cantidad: 1, precio: 10.00, notas: "Sin hielo" },
    ],
    total: 70.00,
    timestamp: new Date(Date.now() - 3 * 60000),
    estado: "en-proceso",
  },
  {
    id: "3",
    numeroOrden: 103,
    alumno: {
      nombre: "Ana Martínez López",
    },
    items: [
      { nombre: "Sándwich de atún", cantidad: 1, precio: 30.00 },
      { nombre: "Galletas", cantidad: 1, precio: 12.00 },
      { nombre: "Leche con chocolate", cantidad: 1, precio: 15.00 },
    ],
    total: 57.00,
    timestamp: new Date(Date.now() - 8 * 60000),
    estado: "listo",
  },
  {
    id: "4",
    numeroOrden: 104,
    alumno: {
      nombre: "Luis Hernández Cruz",
    },
    items: [
      { nombre: "Hot dog", cantidad: 1, precio: 25.00 },
      { nombre: "Papas fritas", cantidad: 1, precio: 20.00, notas: "Extra ketchup" },
      { nombre: "Refresco", cantidad: 1, precio: 15.00 },
    ],
    total: 60.00,
    timestamp: new Date(Date.now() - 1 * 60000),
    estado: "en-proceso",
  },
  {
    id: "5",
    numeroOrden: 105,
    alumno: {
      nombre: "Sofía Jiménez Ruiz",
    },
    items: [
      { nombre: "Ensalada de frutas", cantidad: 1, precio: 25.00 },
      { nombre: "Yogurt", cantidad: 1, precio: 18.00 },
    ],
    total: 43.00,
    timestamp: new Date(Date.now() - 12 * 60000),
    estado: "listo",
  },
];

export default function App() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [filter, setFilter] = useState<"todos" | "en-proceso" | "listo">("todos");

  const handleStatusChange = (orderId: string, newStatus: "en-proceso" | "listo") => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, estado: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    if (filter === "todos") return true;
    return order.estado === filter;
  });

  const enProcesoCount = orders.filter(o => o.estado === "en-proceso").length;
  const listoCount = orders.filter(o => o.estado === "listo").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">KDS - Cafetería Universitaria</h1>
              <p className="text-sm text-muted-foreground">Sistema de Visualización de Pedidos</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="text-base px-4 py-2">
                En Proceso: {enProcesoCount}
              </Badge>
              <Badge variant="default" className="text-base px-4 py-2 bg-green-600">
                Listos: {listoCount}
              </Badge>
            </div>
          </div>

          {/* Filtros */}
          <Tabs value={filter} onValueChange={(value) => setFilter(value as typeof filter)}>
            <TabsList>
              <TabsTrigger value="todos">
                Todos ({orders.length})
              </TabsTrigger>
              <TabsTrigger value="en-proceso">
                En Proceso ({enProcesoCount})
              </TabsTrigger>
              <TabsTrigger value="listo">
                Listos ({listoCount})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      {/* Grid de Pedidos */}
      <main className="container mx-auto px-4 py-6">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay pedidos en esta categoría</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredOrders.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}