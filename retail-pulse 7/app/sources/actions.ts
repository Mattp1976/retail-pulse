"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";
import { WORLDVIEWS } from "../../lib/vocab";

function isWorldview(value: string) {
  return (WORLDVIEWS as readonly string[]).includes(value);
}

export async function createSource(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const url = String(formData.get("url") || "").trim();
  const weight = Number(formData.get("weight") || 1);
  const worldview = String(formData.get("worldview") || "uk").trim();

  if (!name || !url || !isWorldview(worldview) || Number.isNaN(weight)) {
    redirect("/sources?error=invalid");
  }

  try {
    await prisma.source.create({
      data: {
        name,
        url,
        weight,
        worldview
      }
    });
  } catch {
    redirect("/sources?error=exists");
  }

  revalidatePath("/sources");
  redirect("/sources?success=created");
}

export async function updateSource(formData: FormData) {
  const id = String(formData.get("id") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const weight = Number(formData.get("weight") || 1);
  const worldview = String(formData.get("worldview") || "uk").trim();

  if (!id || !name || !isWorldview(worldview) || Number.isNaN(weight)) {
    redirect("/sources?error=invalid");
  }

  try {
    await prisma.source.update({
      where: { id },
      data: { name, weight, worldview }
    });
  } catch {
    redirect("/sources?error=update");
  }

  revalidatePath("/sources");
  redirect("/sources?success=updated");
}

export async function deleteSource(formData: FormData) {
  const id = String(formData.get("id") || "").trim();
  if (!id) {
    redirect("/sources?error=invalid");
  }

  try {
    await prisma.source.delete({ where: { id } });
  } catch {
    redirect("/sources?error=delete");
  }

  revalidatePath("/sources");
  redirect("/sources?success=deleted");
}
