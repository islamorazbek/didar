import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("rsvps")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const attending = (data ?? []).filter(r => r.attending);
  const totalGuests = attending.reduce((s: number, r: { guests: number }) => s + (r.guests ?? 1), 0);

  return NextResponse.json({ count: data?.length ?? 0, totalGuests, rsvps: data });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, attending, guests, phone, message } = body;

  if (!name?.trim()) {
    return NextResponse.json({ error: "Аты-жөні міндетті" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("rsvps")
    .insert([{ name: name.trim(), attending: !!attending, guests: guests ?? 1, phone, message }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, rsvp: data }, { status: 201 });
}
