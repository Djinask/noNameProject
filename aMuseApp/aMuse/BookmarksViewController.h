//
//  BookmarksViewController.h
//  aMuse
//
//  Created by simone on 09/05/13.
//  Copyright (c) 2013 simone. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ZBarSDK.h"
#import "ASIFormDataRequest.h"

@interface BookmarksViewController : UIViewController <ZBarReaderDelegate, ASIHTTPRequestDelegate, UIWebViewDelegate>

@property (strong, nonatomic) IBOutlet UIWebView *webView;

- (IBAction)reload;


@end
