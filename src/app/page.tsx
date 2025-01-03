"use client";

import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

export default function Home() {
  const [initialOrder, setInitialOrder] = useState<Color[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Color[]>([]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">
        Spaceland Boss Fight Simon Says
      </h1>

      <ColorOrder
        order={initialOrder}
        setOrder={setInitialOrder}
        title="Initial Order"
      />

      <Separator className="w-full my-8" />

      <ColorOrder
        order={currentOrder}
        setOrder={setCurrentOrder}
        title="Current Order"
      />
    </main>
  );
}

type Color = "red" | "green" | "blue" | "yellow";

const ColorOrder = ({
  order,
  setOrder,
  title,
}: {
  order: Color[];
  setOrder: (order: Color[]) => void;
  title: string;
}) => {
  const listFull = order.length === 4;

  // Create an array of color configs to make the code more DRY
  const colorConfigs = [
    {
      color: "red",
      bgClass: "bg-rose-500",
      hoverClass: "hover:bg-rose-600",
      activeClass: "bg-rose-600",
    },
    {
      color: "green",
      bgClass: "bg-emerald-500",
      hoverClass: "hover:bg-emerald-600",
      activeClass: "bg-emerald-600",
    },
    {
      color: "blue",
      bgClass: "bg-blue-500",
      hoverClass: "hover:bg-blue-600",
      activeClass: "bg-blue-600",
    },
    {
      color: "yellow",
      bgClass: "bg-yellow-500",
      hoverClass: "hover:bg-yellow-600",
      activeClass: "bg-yellow-600",
    },
  ] as const;

  // Sort the buttons based on their order when list is full
  const sortedConfigs = listFull
    ? [...colorConfigs].sort(
        (a, b) =>
          order.indexOf(a.color as Color) - order.indexOf(b.color as Color)
      )
    : colorConfigs;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <section className="grid grid-cols-4 gap-4 w-full">
          {sortedConfigs.map(({ color, bgClass, hoverClass, activeClass }) => (
            <Button
              key={color}
              className={cn(
                `${bgClass} h-44 ${hoverClass} text-white font-bold text-4xl`,
                order.includes(color) && activeClass
              )}
              onClick={() => setOrder([...order, color as Color])}
            >
              {order.includes(color) ? order.indexOf(color) + 1 : ""}
            </Button>
          ))}
        </section>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" onClick={() => setOrder([])}>
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
};
