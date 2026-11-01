// Read the text in an image with macOS's own Vision framework (on-device, no network). Prints one JSON array of
// {text, x, y, w, h} lines (normalised 0..1, origin top-left), so the dashboard can find numbers next to their labels.
//   swiftc -O ocr.swift -o ~/miki-ops/bin/ocr && ~/miki-ops/bin/ocr shot.jpg
import Foundation
import Vision
import AppKit

let path = CommandLine.arguments[1]
guard let img = NSImage(contentsOfFile: path), let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
  FileHandle.standardError.write("cannot read \(path)\n".data(using: .utf8)!); exit(1)
}
let req = VNRecognizeTextRequest()
req.recognitionLevel = .accurate
req.usesLanguageCorrection = false
try VNImageRequestHandler(cgImage: cg, options: [:]).perform([req])
var out: [[String: Any]] = []
for r in (req.results ?? []) {
  guard let t = r.topCandidates(1).first else { continue }
  let b = r.boundingBox
  out.append(["text": t.string, "x": b.minX, "y": 1 - b.maxY, "w": b.width, "h": b.height])
}
let data = try JSONSerialization.data(withJSONObject: out)
print(String(data: data, encoding: .utf8)!)
